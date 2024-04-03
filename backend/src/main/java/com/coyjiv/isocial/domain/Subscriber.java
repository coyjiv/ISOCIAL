package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "subscribers")
public class Subscriber extends AbstractEntity {
  @Column(name = "user_id")
  private Long userId;

  @Column(name = "subscriber_id")
  private Long subscriberId;

  public Subscriber(Long userId, Long subscriberId) {
    this.setActive(true);
    this.userId = userId;
    this.subscriberId = subscriberId;
  }
}
