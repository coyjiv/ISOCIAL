package com.coyjiv.isocial.service.websocket;

import com.coyjiv.isocial.domain.*;

import java.util.List;

public interface IWebsocketService {
  void sendMessageNotificationToUsers(List<User> users, Message message);


  void sendFriendNotificationToUser(Friend friend);

  void sendRepostNotificationToUser(Post repost, Long originalPostAuthorId);

  void sendSubscriptionEventNotificationToUser(Post post);

  void sendLikeNotificationToUser(Like like);

  void sendCommentNotification(Comment comment);
}
