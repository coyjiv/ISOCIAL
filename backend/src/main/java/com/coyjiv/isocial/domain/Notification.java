package com.coyjiv.isocial.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notifications")
@Getter
@Builder
@AllArgsConstructor
@Setter
@ToString
@NoArgsConstructor
public class Notification extends AbstractEntity {

  @Column(name = "receiver_id")
  private Long receiverId;

  @Column(name = "sender_id")
  private Long senderId;

  @Column(name = "sender_name")
  private String senderName;

  @Column(name = "sender_avatar")
  private String senderAvatar ;

  @Enumerated(EnumType.STRING)
  @Column(name = "event_type")
  private NotificationEvent eventType;

  @Column(name = "entity_id")
  private Long entityId;
}
