package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "subscriptions")
public class Subscription extends AbstractEntity{
  @Column(name = "user_id")
  private Long userId;

  @Column(name = "subscriber_id")
  private Long subscriberId;

  public Subscription(Long userId, Long subscriberId, boolean isActive) {
    super(isActive);
    this.userId = userId;
    this.subscriberId = subscriberId;
  }
}
