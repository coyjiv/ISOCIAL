package com.coyjiv.isocial.service.chat;


import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.respone.chat.ActiveChatDto;
import com.coyjiv.isocial.dto.respone.chat.ActiveChatListDto;
import com.coyjiv.isocial.dto.respone.page.ChatPageWrapper;
import com.coyjiv.isocial.exceptions.ChatAlreadyExistException;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;

import java.util.Optional;

public interface IChatService {
  ChatPageWrapper<ActiveChatListDto> findAllActive(int page, int quantity);

  Chat findActiveById(Long id) throws IllegalAccessException, EntityNotFoundException;

  ActiveChatListDto findActiveDtoById(Long id) throws IllegalAccessException, EntityNotFoundException;

  ActiveChatDto create(CreateMessageRequestDto firstMessageDto, Long receiverId)
          throws EntityNotFoundException, IllegalAccessException, ChatAlreadyExistException, RequestValidationException;

  Chat updateLastMessage(Long id, String lastMessageText,Long lastMessageBy)
          throws IllegalAccessException, EntityNotFoundException;

  void delete(Long id)
          throws IllegalAccessException, EntityNotFoundException;

  Optional<Long> isUserInvolvedInChat(Long userId)
      throws EntityNotFoundException;
}
