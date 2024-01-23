package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.UpdateMessageRequestDto;

import java.util.List;
import java.util.Optional;

public interface IMessageService {

  List<Message> findAll(int page, int quantity, Long chatId);

  Optional<Message> findById(Long id);

  Message create(Long chatId, CreateMessageRequestDto createMessageRequestDto) throws Exception;

  Message update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto) throws Exception;

  void delete(Long id);
}
