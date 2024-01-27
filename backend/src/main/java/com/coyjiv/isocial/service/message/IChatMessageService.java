package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.UpdateMessageRequestDto;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;
import com.coyjiv.isocial.exceptions.MessageNotFoundException;

import java.util.List;

public interface IChatMessageService {

  List<Message> findAllActiveByChatId(int page, int quantity, Long chatId) throws ChatNotFoundException, IllegalAccessException;

  Message findActiveById(Long id) throws IllegalAccessException, MessageNotFoundException;

  Message create(Long chatId, CreateMessageRequestDto createMessageRequestDto) throws ChatNotFoundException, IllegalAccessException;

  Message update(Long messageId, UpdateMessageRequestDto updateMessageRequestDto) throws IllegalAccessException, MessageNotFoundException, ChatNotFoundException;

  void delete(Long id) throws IllegalAccessException, ChatNotFoundException;
}
