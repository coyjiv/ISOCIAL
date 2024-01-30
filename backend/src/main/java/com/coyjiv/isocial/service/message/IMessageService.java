package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.message.UpdateMessageRequestDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;

import java.util.List;

public interface IMessageService {

  List<Message> findAllActiveByChatId(int page, int quantity, Long chatId)
          throws EntityNotFoundException, IllegalAccessException;

  Message findActiveById(Long id) throws IllegalAccessException, EntityNotFoundException;

  Message create(Long chatId, CreateMessageRequestDto createMessageRequestDto)
          throws EntityNotFoundException, IllegalAccessException, RequestValidationException;

  Message update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto)
          throws IllegalAccessException, EntityNotFoundException;

  void delete(Long id) throws IllegalAccessException, EntityNotFoundException;
}
