package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.MessageRepository;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.message.UpdateMessageRequestDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.chat.IChatService;
import com.coyjiv.isocial.service.websocket.IWebsocketService;
import com.coyjiv.isocial.transfer.message.CreateMessageRequestMapper;
import com.coyjiv.isocial.utils.MessagesUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {

  private final MessageRepository messageRepository;
  private final IChatService chatService;
  private final CreateMessageRequestMapper createMessageRequestMapper;
  private final EmailPasswordAuthProvider authProvider;

  private final IWebsocketService websocketChatMessageService;

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<Message> findAllActiveByChatId(int page, int quantity, Long chatId)
          throws EntityNotFoundException, IllegalAccessException {
    Sort sort = Sort.by(Sort.Direction.ASC, "creationDate");
    Pageable pageable = PageRequest.of(page, quantity, sort);

    Chat chat = chatService.findActiveById(chatId);

    Page<Message> messages =  messageRepository.findAllActiveByChatId(chat.getId(), pageable);

    boolean hasNext = messages.hasNext();

    return new PageWrapper<>(messages.toList(),hasNext);
  }

  @Transactional(readOnly = true)
  @Override
  public Message findActiveById(Long id)
          throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Message> messageOptional = messageRepository.findActiveById(id);

    if (messageOptional.isPresent() && isRequestOwnerSender(requestOwnerId, messageOptional.get())) {
      return messageOptional.get();
    } else {
      throw new EntityNotFoundException("Message not found");
    }

  }

  @Transactional
  @Override
  public Message create(Long chatId, CreateMessageRequestDto createMessageRequestDto)
          throws EntityNotFoundException, IllegalAccessException, RequestValidationException {

    MessagesUtils.validateFirstMessage(createMessageRequestDto);

    Message message = createMessageRequestMapper.convertToEntity(createMessageRequestDto);
    message.setChatId(chatId);

    Chat chat = chatService.updateLastMessage(chatId,
            message.getText() != null ? message.getText() : "ATTACHMENT",
            message.getSenderId()
    );

    messageRepository.save(message);
    websocketChatMessageService.sendMessageNotificationToUsers(chat.getUsers(), message);

    return message;
  }

  @Transactional
  @Override
  public Message update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto)
          throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();

    Optional<Message> messageOptional = messageRepository.findActiveById(messageId);
    if (messageOptional.isPresent() && isRequestOwnerSender(requestOwnerId, messageOptional.get())) {
      Message message = messageOptional.get();
      message.setText(updateMessageRequestDto.getText());
      message.setEdited(true);
      chatService.updateLastMessage(message.getChatId(),
              updateMessageRequestDto.getText(),
              message.getSenderId());
      return message;
    } else {
      throw new EntityNotFoundException("Message not found");
    }
  }

  @Transactional
  @Override
  public void delete(Long id) throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Message> messageOptional = messageRepository.findActiveById(id);

    if (messageOptional.isPresent() && isRequestOwnerSender(requestOwnerId, messageOptional.get())) {
      Message message = messageOptional.get();
      message.setActive(false);
      messageRepository.save(message);

      Optional<Message> prevMessage = messageRepository.findLastActiveById(message.getChatId());
      String lastMessage = prevMessage.map(Message::getText).orElse(null);
      Long lastMessageBy = prevMessage.map(Message::getSenderId).orElse(null);
      chatService.updateLastMessage(message.getChatId(), lastMessage, lastMessageBy);
    }
  }

  public boolean isRequestOwnerSender(Long requestOwnerId, Message message) throws IllegalAccessException {
    if (!message.getSenderId().equals(requestOwnerId)) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }
    return true;
  }
}
