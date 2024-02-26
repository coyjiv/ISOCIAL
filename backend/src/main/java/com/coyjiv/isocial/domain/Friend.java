package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "friends")
@Entity
public class Friend extends AbstractEntity {

  @ManyToOne
  @JoinColumn(name = "requester_id")
  private User requester;

  @ManyToOne
  @JoinColumn(name = "addresser_id")
  private User addresser;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private UserFriendStatus status;

  public Friend(User requester, User addresser) {
    this.requester = requester;
    this.addresser = addresser;
    this.status = UserFriendStatus.REQUEST_SENT;
    this.setActive(true);
  }

  public void accept() {
    this.status = UserFriendStatus.FRIEND;
  }

  public void decline() {
    this.status = UserFriendStatus.NOT_FRIEND;
  }
}
