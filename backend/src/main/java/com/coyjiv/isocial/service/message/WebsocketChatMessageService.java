package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.respone.ChatMessageNotificationDto;
import com.coyjiv.isocial.transfer.message.ChatMessageNotificationDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebsocketChatMessageService implements IWebsocketChatMessageService {

  private final SimpMessagingTemplate messagingTemplate;
  private final ChatMessageNotificationDtoMapper messageNotificationDtoMapper;

  @Override
  public void sendMessageNotificationToUser(Long receiverId, String senderName, Message message) {
    ChatMessageNotificationDto notificationDto = messageNotificationDtoMapper.convertToDto(message);
    notificationDto.setSenderName(senderName);

    messagingTemplate.convertAndSendToUser(
            String.valueOf(receiverId), "/queue/messages",notificationDto
    );
  }
}
