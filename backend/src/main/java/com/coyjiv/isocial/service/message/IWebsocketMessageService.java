package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;

import java.util.List;

public interface IWebsocketMessageService {
  void sendMessageNotificationToUser(List<User> users, Message message);
}
