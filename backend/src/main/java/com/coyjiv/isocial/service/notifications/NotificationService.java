package com.coyjiv.isocial.service.notifications;

import com.coyjiv.isocial.dao.NotificationRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.Notification;
import com.coyjiv.isocial.domain.NotificationEvent;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

  private final NotificationRepository notificationRepository;

  @Override
  public PageWrapper<Notification> findAllForUser(Long receiverId, int page, int size) {
    Sort sort = Sort.by(Sort.Direction.DESC, "creationDate");
    Pageable pageable = PageRequest.of(page, size, sort);
    Page<Notification> notificationPage = notificationRepository.findAllForUser(receiverId, pageable);

    List<Notification> dtos = notificationRepository.findAllForUser(receiverId, pageable).stream().toList();

    boolean hasNext = notificationPage.hasNext();

    return new PageWrapper<>(dtos, hasNext);
  }

  @Override
  public void create(Long receiverId,
                     Long senderId,
                     String senderName,
                     String senderAvatar,
                     NotificationEvent eventType,
                     Long entityId) {
    Notification notification = Notification.builder()
            .entityId(entityId)
            .eventType(eventType)
            .receiverId(receiverId)
            .senderAvatar(senderAvatar)
            .senderId(senderId)
            .senderName(senderName)
            .build();
    notification.setActive(true);
    notificationRepository.save(notification);
  }

  @Override
  public void delete(Long senderId, Long entityId, Date creationDate) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(creationDate);

    calendar.add(Calendar.SECOND, -1);
    Date startDate = calendar.getTime();

    calendar.setTime(creationDate);
    calendar.add(Calendar.SECOND, 1);
    Date endDate = calendar.getTime();

    notificationRepository.delete(senderId, entityId, startDate, endDate);
  }
}
