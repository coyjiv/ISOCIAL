package com.coyjiv.isocial.service.chat;


import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.respone.ActiveChatDto;
import com.coyjiv.isocial.dto.respone.ActiveChatListDto;
import com.coyjiv.isocial.exceptions.ChatAlreadyExistException;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;

public interface IChatService {
  List<ActiveChatListDto> findAllActive(int page, int quantity);

  Chat findActiveById(Long id) throws IllegalAccessException, ChatNotFoundException;

  ActiveChatDto findActiveDtoById(Long id) throws IllegalAccessException, ChatNotFoundException;

  ActiveChatDto create(CreateMessageRequestDto firstMessageDto, Long receiverId)
          throws AccountNotFoundException, IllegalAccessException, ChatAlreadyExistException;

  Chat updateLastMessage(Long id, String lastMessageText,Long lastMessageBy)
          throws ChatNotFoundException, IllegalAccessException;

  void delete(Long id)
          throws IllegalAccessException, ChatNotFoundException;
}
