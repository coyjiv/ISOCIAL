package com.coyjiv.isocial.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message extends AbstractEntity {

  @Column(name = "chat_id")
  private Long chatId;

  @Column(name = "sender_id")
  private Long senderId;

  @Column(name = "status")
  private MessageStatus status;

  @Column(name = "text")
  private String text;

  @Column(name = "attachements")
  private List<String> attachements;

  @Column(name = "is_editted")
  private boolean isEditted;
}
