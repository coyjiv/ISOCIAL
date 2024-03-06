package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
public class Message extends AbstractEntity implements Likeable {

  @Column(name = "chat_id")
  private Long chatId;

  @Column(name = "sender_id")
  private Long senderId;

  @Column(name = "status")
  private MessageStatus status;

  @Column(name = "text")
  private String text;

  @Column(name = "attachments")
  private List<String> attachments;

  @Column(name = "is_edited")
  private boolean isEdited;

  @Override
  public LikeableEntity getEntityType() {
    return LikeableEntity.MESSAGE;
  }
}
