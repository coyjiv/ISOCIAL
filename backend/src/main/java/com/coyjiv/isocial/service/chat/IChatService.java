package com.coyjiv.isocial.service.chat;


import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

public interface IChatService {
  List<Chat> findAll(int page, int quantity, Long userId);

  Optional<Chat> findById(Long id);

  Chat create(CreateMessageRequestDto firstMessageDto, Long recieverId) throws AccountNotFoundException;

  Chat update(Chat chat);

  void delete(Long id);
}
