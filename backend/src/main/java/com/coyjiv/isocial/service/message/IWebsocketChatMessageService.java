package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;

public interface IWebsocketChatMessageService {

  void sendMessageNotificationToUser(Long receiverId, String senderName, Message message);
}
