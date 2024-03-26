package com.coyjiv.isocial.service.chat;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.ChatRepository;
import com.coyjiv.isocial.dao.MessageRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.AbstractEntity;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.respone.chat.ActiveChatDto;
import com.coyjiv.isocial.dto.respone.chat.ActiveChatListDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.exceptions.ChatAlreadyExistException;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.websocket.IWebsocketService;
import com.coyjiv.isocial.transfer.chat.ActiveChatDtoMapper;
import com.coyjiv.isocial.transfer.chat.ActiveChatListDtoMapper;
import com.coyjiv.isocial.transfer.message.CreateMessageRequestMapper;
import com.coyjiv.isocial.utils.MessagesUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Objects;
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
  private final IWebsocketService websocketChatMessageService;

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<ActiveChatListDto> findAllActive(int page, int quantity) {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();

    Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate");
    Pageable pageable = PageRequest.of(page, quantity, sort);

    Page<Chat> chats = userRepository.findAllActiveChats(requestOwnerId, pageable);

    List<ActiveChatListDto> dtos = chats
            .stream().filter(AbstractEntity::isActive).map(activeChatListDtoMapper::convertToDto).toList();

    boolean hasNext = chats.hasNext();

    return new PageWrapper<>(dtos,hasNext);

  }

  @Transactional(readOnly = true)
  @Override
  public ActiveChatDto findActiveDtoById(Long id)
          throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Chat chat = findActiveById(id);

    isRequestOwnerInChat(requestOwnerId, chat);
    return activeChatDtoMapper.convertToDto(chat);

  }

  @Transactional(readOnly = true)
  @Override
  public Chat findActiveById(Long id)
          throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Chat> chatOptional = chatRepository.findActiveById(id);

    if (chatOptional.isPresent() && isRequestOwnerInChat(requestOwnerId, chatOptional.get())) {
      return chatOptional.get();
    } else {
      throw new EntityNotFoundException("Chat not found");
    }
  }

  @Transactional
  @Override
  public ActiveChatDto create(CreateMessageRequestDto firstMessageDto, Long receiverId)
          throws EntityNotFoundException, IllegalAccessException,
          ChatAlreadyExistException, RequestValidationException {

    MessagesUtils.validateFirstMessage(firstMessageDto);

    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    if (Objects.equals(requestOwnerId, receiverId)) {
      throw new RequestValidationException("User cant create chat with himself");
    }

    Message firstMessage = createMessageRequestMapper.convertToEntity(firstMessageDto);

    //TODO: LATER USE user service
    User sender = userRepository.findActiveById(requestOwnerId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
    User receiver = userRepository.findActiveById(receiverId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

    Optional<Chat> chatOptional = chatRepository.findChatBetweenUsers(sender, receiver);
    Chat chat;

    if (chatOptional.isPresent() && chatOptional.get().isActive()) {
      throw new ChatAlreadyExistException("Chat already exist");
    } else {
      chat = chatOptional.map(value -> reCreateInactive(value, firstMessage))
              .orElseGet(() -> create(List.of(sender, receiver), firstMessage));
    }

    firstMessage.setChatId(chat.getId());
    messageRepository.save(firstMessage);
    websocketChatMessageService.sendMessageNotificationToUsers(chat.getUsers(), firstMessage);
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
          throws IllegalAccessException, EntityNotFoundException {
    Chat chat = findActiveById(id);
    chat.setLastMessage(lastMessageText);
    chat.setLastMessageDate(new Date());
    chat.setLastMessageBy(lastMessageBy);
    return chatRepository.save(chat);
  }


  @Transactional
  @Override
  public void delete(Long id)
          throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Chat> chatOptional = chatRepository.findActiveById(id);

    if (chatOptional.isPresent() && isRequestOwnerInChat(requestOwnerId, chatOptional.get())) {
      Chat chat = chatOptional.get();
      chat.setActive(false);
      chatRepository.save(chat);

      List<Message> messages = messageRepository.findAllActiveByChatId(chat.getId(),
              PageRequest.of(0, Integer.MAX_VALUE)).toList();

      messages.forEach(message -> message.setActive(false));
      messageRepository.saveAll(messages);

    } else {
      throw new EntityNotFoundException("Chat not found");
    }
  }

  private boolean isRequestOwnerInChat(Long requestOwnerId, Chat chat) throws IllegalAccessException {
    if (chat.getUsers().stream().noneMatch(user -> user.getId().equals(requestOwnerId))) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }

    return true;
  }


}
