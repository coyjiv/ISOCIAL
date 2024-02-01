package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subscriptions")
public class Subscription extends AbstractEntity{
  @Column(name = "user_id")
  private Long userId;

  @Column(name = "subscriber_id")
  private Long subscriberId;

  @Column(name = "is_subscribed")
  private boolean isSubscribed;
}
