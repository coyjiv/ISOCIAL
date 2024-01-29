package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Friend {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "requester_id")
  private User requester;

  @ManyToOne
  @JoinColumn(name = "addresser_id")
  private User addresser;

  @Column(name = "status")
  private String status;

  public Friend(User requester, User addresser) {
    this.requester = requester;
    this.addresser = addresser;
    this.status = "PENDING";
  }

  public void accept() {
    this.status = "ACCEPTED";
  }

  public void decline() {
    this.status = "DECLINED";
  }
}
