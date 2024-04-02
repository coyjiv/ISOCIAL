package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.message.UpdateMessageRequestDto;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;

public interface IMessageService {

  PageWrapper<MessageNotificationDto> findAllActiveByChatId(int page, int quantity, Long chatId)
          throws EntityNotFoundException, IllegalAccessException;

  MessageNotificationDto findActiveById(Long id) throws IllegalAccessException, EntityNotFoundException;

  MessageNotificationDto create(Long chatId, CreateMessageRequestDto createMessageRequestDto)
          throws EntityNotFoundException, IllegalAccessException, RequestValidationException;

  MessageNotificationDto update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto)
          throws IllegalAccessException, EntityNotFoundException;

  void delete(Long id) throws IllegalAccessException, EntityNotFoundException;
}
