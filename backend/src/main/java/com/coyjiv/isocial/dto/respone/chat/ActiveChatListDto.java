package com.coyjiv.isocial.dto.respone.chat;

import com.coyjiv.isocial.domain.UserActivityStatus;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ActiveChatListDto {
  private Long id;
  private String chatName;
  private String lastMessage;
  private Long lastMessageBy;
  private Date lastMessageDate;
  private String avatarUrl;
  private UserActivityStatus receiverStatus;
}
