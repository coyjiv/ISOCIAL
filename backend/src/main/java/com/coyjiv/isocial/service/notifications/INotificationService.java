package com.coyjiv.isocial.service.notifications;

import com.coyjiv.isocial.domain.Notification;
import com.coyjiv.isocial.domain.NotificationEvent;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;
import java.util.List;

public interface INotificationService {

  List<Notification> findAllForUser(Long userId, int page, int size);

  void create(
          Long receiverId,
          Long senderId,
          String senderName,
          String senderAvatar,
          NotificationEvent eventType,
          Long entityId);

  void delete(Long senderId, Long entityId, Date creationDate);

}
