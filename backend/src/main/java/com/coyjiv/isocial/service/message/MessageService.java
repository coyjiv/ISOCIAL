package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.dao.ChatRepository;
import com.coyjiv.isocial.dao.MessageRepository;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.UpdateMessageRequestDto;
import com.coyjiv.isocial.transfer.message.CreateMessageRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {

  private final MessageRepository messageRepository;
  private final ChatRepository chatRepository;
  private final CreateMessageRequestMapper createMessageRequestMapper;

  @Override
  public List<Message> findAll(int page, int quantity, Long chatId) {
    Sort sort = Sort.by(Sort.Direction.DESC, "creationDate");
    Pageable pageable = PageRequest.of(page, quantity, sort);

    return messageRepository.findAllByChatId(chatId, pageable);
  }

  @Override
  public Optional<Message> findById(Long id) {
    return messageRepository.findById(id);
  }

  @Override
  public Message create(Long chatId, CreateMessageRequestDto createMessageRequestDto) throws Exception {
    return chatRepository.findById(chatId).map((c) -> {
      Message message = createMessageRequestMapper.convertToEntity(createMessageRequestDto);
      message.setChatId(chatId);
      // TODO: Need to implement websocket logic
      return messageRepository.save(message);
    }).orElseThrow(() -> new Exception("Chat with this id not found"));
  }

  @Override
  public Message update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto) throws Exception {
    return messageRepository.findById(messageId).map(message -> {
      message.setText(updateMessageRequestDto.getText());
      message.setEditted(true);
      return message;
    }).orElseThrow(() -> new Exception("Chat with this id not found"));
  }

  @Override
  public void delete(Long id) {
    messageRepository.deleteById(id);
  }
}
