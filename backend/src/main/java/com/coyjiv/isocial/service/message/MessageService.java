package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.MessageRepository;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.UpdateMessageRequestDto;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;
import com.coyjiv.isocial.exceptions.MessageNotFoundException;
import com.coyjiv.isocial.service.chat.IChatService;
import com.coyjiv.isocial.transfer.message.CreateMessageRequestMapper;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

// TODO: Need to implement websocket logic
@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {

  private final MessageRepository messageRepository;
  private final IChatService chatService;
  private final CreateMessageRequestMapper createMessageRequestMapper;
  private final EmailPasswordAuthProvider authProvider;

  @Transactional(readOnly = true)
  @Override
  public List<Message> findAllActiveByChatId(int page, int quantity, Long chatId)
          throws ChatNotFoundException, IllegalAccessException {
    Sort sort = Sort.by(Sort.Direction.DESC, "creationDate");
    Pageable pageable = PageRequest.of(page, quantity, sort);

    Chat chat = chatService.findActiveById(chatId);

    return messageRepository.findAllActiveByChatId(chat.getId(), pageable);
  }

  @Transactional(readOnly = true)
  @Override
  public Message findActiveById(Long id) throws IllegalAccessException, MessageNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Message> messageOptional = messageRepository.findActiveById(id);

    if (messageOptional.isPresent() && isRequestOwnerSender(requestOwnerId, messageOptional.get())) {
      return messageOptional.get();
    } else {
      throw new MessageNotFoundException("Message not found");
    }

  }

  @Transactional
  @Override
  public Message create(Long chatId, CreateMessageRequestDto createMessageRequestDto)
          throws ChatNotFoundException, IllegalAccessException {

    if (createMessageRequestDto.getText() == null && createMessageRequestDto.getAttachements() == null
            || createMessageRequestDto.getAttachements() == null && createMessageRequestDto.getText().isEmpty()
    ) {
      throw new ValidationException("First message should have text or attachments");
    }


    Chat chat = chatService.findActiveById(chatId);
    Message message = createMessageRequestMapper.convertToEntity(createMessageRequestDto);
    message.setChatId(chat.getId());


    return messageRepository.save(message);
  }

  @Transactional
  @Override
  public Message update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto)
          throws IllegalAccessException, MessageNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();

    Optional<Message> messageOptional = messageRepository.findActiveById(messageId);
    if (messageOptional.isPresent() && isRequestOwnerSender(requestOwnerId, messageOptional.get())) {
      Message message = messageOptional.get();

      message.setText(updateMessageRequestDto.getText());
      message.setEditted(true);
      return message;
    } else {
      throw new MessageNotFoundException("Message not found");
    }
  }

  @Transactional
  @Override
  public void delete(Long id) throws IllegalAccessException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    Optional<Message> messageOptional = messageRepository.findActiveById(id);

    if (messageOptional.isPresent() && isRequestOwnerSender(requestOwnerId, messageOptional.get())) {
      Message message = messageOptional.get();
      message.setActive(false);
      messageRepository.save(message);
    }
  }

  public boolean isRequestOwnerSender(Long requestOwnerId, Message message) throws IllegalAccessException {
    if (!message.getSenderId().equals(requestOwnerId)) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }
    return true;
  }
}
