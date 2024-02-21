package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;

import java.util.List;

public interface IWebsocketMessageService {
  void sendMessageNotificationToUsers(List<User> users, Message message);

  void sendLikeNotificationToUser();

  void sendFriendNotificationToUser(Friend friend);

  void sendRepostNotificationToUser(Post post);

}
