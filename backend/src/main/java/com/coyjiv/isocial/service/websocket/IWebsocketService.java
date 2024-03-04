package com.coyjiv.isocial.service.websocket;

import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;

import java.util.List;

public interface IWebsocketService {
  void sendMessageNotificationToUsers(List<User> users, Message message);


  void sendFriendNotificationToUser(Friend friend);

  void sendRepostNotificationToUser(Post repost, Long originalPostAuthorId);

  void sendSubscriptionEventNotificationToUser(Post post);

  void sendLikeNotificationToUser(Like like);

  void sendCommentNotification(Comment comment);
}
