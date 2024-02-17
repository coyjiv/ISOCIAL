package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.transfer.message.MessageNotificationDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WebsocketMessageService implements IWebsocketMessageService {

  private final SimpMessagingTemplate messagingTemplate;
  private final MessageNotificationDtoMapper messageNotificationDtoMapper;

  @Override
  @Transactional
  public void sendMessageNotificationToUser(List<User> users, Message message) {
    MessageNotificationDto messageNotificationDto = messageNotificationDtoMapper.convertToDto(message);

    users.forEach((user -> {
      if (!Objects.equals(user.getId(), message.getSenderId())) {
        messagingTemplate.convertAndSendToUser(
                String.valueOf(user.getId()), "/messages", messageNotificationDto
        );
      }
    }));
  }
}
