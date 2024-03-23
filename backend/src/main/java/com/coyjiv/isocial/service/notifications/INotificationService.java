package com.coyjiv.isocial.service.notifications;

import com.coyjiv.isocial.domain.Notification;
import com.coyjiv.isocial.domain.NotificationEvent;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;

import java.util.Date;

public interface INotificationService {

  PageWrapper<Notification> findAllForUser(Long userId, int page, int size);

  void create(
          Long receiverId,
          Long senderId,
          String senderName,
          String senderAvatar,
          NotificationEvent eventType,
          Long entityId);

  void delete(Long senderId, Long entityId, Date creationDate);

}
