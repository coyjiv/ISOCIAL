package com.coyjiv.isocial.service.chat;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.ChatRepository;
import com.coyjiv.isocial.dao.MessageRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.AbstractEntity;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.respone.ActiveChatDto;
import com.coyjiv.isocial.dto.respone.ActiveChatListDto;
import com.coyjiv.isocial.exceptions.ChatAlreadyExistException;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;
import com.coyjiv.isocial.service.message.IWebsocketMessageService;
import com.coyjiv.isocial.transfer.chat.ActiveChatDtoMapper;
import com.coyjiv.isocial.transfer.chat.ActiveChatListDtoMapper;
import com.coyjiv.isocial.transfer.message.CreateMessageRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.login.AccountNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ChatService implements IChatService {

  private final ChatRepository chatRepository;
  private final UserRepository userRepository;
  private final MessageRepository messageRepository;
  private final CreateMessageRequestMapper createMessageRequestMapper;
  private final ActiveChatListDtoMapper activeChatListDtoMapper;
  private final EmailPasswordAuthProvider authProvider;
  private final ActiveChatDtoMapper activeChatDtoMapper;
  private final IWebsocketMessageService websocketChatMessageService;

  @Transactional(readOnly = true)
  @Override
  public List<ActiveChatListDto> findAllActive(int page, int quantity) {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();

    Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate");
    Pageable pageable = PageRequest.of(page, quantity, sort);
    return userRepository.findAllActiveChats(requestOwnerId, pageable)
            .stream().filter(AbstractEntity::isActive).map(activeChatListDtoMapper::convertToDto).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public ActiveChatDto findActiveDtoById(Long id) throws IllegalAccessException, ChatNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Chat chat = findActiveById(id);

    isRequestOwnerInChat(requestOwnerId, chat);
    return activeChatDtoMapper.convertToDto(chat);

  }

  @Transactional(readOnly = true)
  @Override
  public Chat findActiveById(Long id) throws IllegalAccessException, ChatNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Chat> chatOptional = chatRepository.findActiveById(id);

    if (chatOptional.isPresent() && isRequestOwnerInChat(requestOwnerId, chatOptional.get())) {
      return chatOptional.get();
    } else {
      throw new ChatNotFoundException("Chat not found");
    }
  }

  @Transactional
  @Override
  public ActiveChatDto create(CreateMessageRequestDto firstMessageDto, Long receiverId)
          throws AccountNotFoundException, IllegalAccessException, ChatAlreadyExistException {

    if (firstMessageDto.getText() == null && firstMessageDto.getAttachements() == null
            || firstMessageDto.getAttachements() == null && firstMessageDto.getText().isBlank()
    ) {
      throw new IllegalArgumentException("First message should have text or attachments");
    }

    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Message firstMessage = createMessageRequestMapper.convertToEntity(firstMessageDto);
    Optional<Chat> chatOptional = chatRepository.findChatBetweenUsers(List.of(requestOwnerId, receiverId));
    Chat chat;

    if (chatOptional.isPresent() && chatOptional.get().isActive()) {
      throw new ChatAlreadyExistException("Chat already exist");
    } else if (chatOptional.isPresent()) {
      chat = reCreateInactive(chatOptional.get(), firstMessage);
    } else {
      //TODO: LATER USE user service
      User sender = userRepository.findActiveById(requestOwnerId)
              .orElseThrow(() -> new AccountNotFoundException("User not found"));
      User receiver = userRepository.findActiveById(receiverId)
              .orElseThrow(() -> new AccountNotFoundException("User not found"));

      chat = create(List.of(sender, receiver), firstMessage);
    }

    firstMessage.setChatId(chat.getId());
    messageRepository.save(firstMessage);
    websocketChatMessageService.sendMessageNotificationToUser(chat.getUsers(), firstMessage);
    return activeChatDtoMapper.convertToDto(chat);
  }


  private Chat create(List<User> users, Message firstMessage) {
    Chat newChat = new Chat();
    newChat.setUsers(users);
    newChat.setActive(true);
    setLastMessageData(newChat, firstMessage);
    chatRepository.save(newChat);

    return newChat;
  }

  private Chat reCreateInactive(Chat existingChat, Message firstMessage) {
    existingChat.setActive(true);
    setLastMessageData(existingChat, firstMessage);
    chatRepository.save(existingChat);
    return existingChat;
  }

  private void setLastMessageData(Chat chat, Message firstMessage) {
    chat.setLastMessage(firstMessage.getText() != null ? firstMessage.getText() : "ATTACHMENT");
    chat.setLastMessageDate(new Date());
    chat.setLastMessageBy(firstMessage.getSenderId());
  }

  @Transactional
  @Override
  public Chat updateLastMessage(Long id, String lastMessageText, Long lastMessageBy)
          throws ChatNotFoundException, IllegalAccessException {
    Chat chat = findActiveById(id);
    chat.setLastMessage(lastMessageText);
    chat.setLastMessageDate(new Date());
    chat.setLastMessageBy(lastMessageBy);
    return chatRepository.save(chat);
  }


  @Transactional
  @Override
  public void delete(Long id)
          throws IllegalAccessException, ChatNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Chat> chatOptional = chatRepository.findActiveById(id);

    if (chatOptional.isPresent() && isRequestOwnerInChat(requestOwnerId, chatOptional.get())) {
      Chat chat = chatOptional.get();
      chat.setActive(false);
      chatRepository.save(chat);

      List<Message> messages = messageRepository.findAllActiveByChatId(chat.getId(),
              PageRequest.of(0, Integer.MAX_VALUE));

      messages.forEach(message -> message.setActive(false));
      messageRepository.saveAll(messages);

    } else {
      throw new ChatNotFoundException("Chat not found");
    }
  }

  public boolean isRequestOwnerInChat(Long requestOwnerId, Chat chat) throws IllegalAccessException {
    if (chat.getUsers().stream().noneMatch(user -> user.getId().equals(requestOwnerId))) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }

    return true;
  }

}
