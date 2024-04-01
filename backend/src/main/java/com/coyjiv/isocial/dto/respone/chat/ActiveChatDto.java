package com.coyjiv.isocial.dto.respone.chat;

import com.coyjiv.isocial.domain.UserActivityStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ActiveChatDto {
  private Long id;
  private Long receiverId;
  private String chatName;
  private String avatarUrl;
  private UserActivityStatus receiverStatus;
  private Date receiverLastSeen;
}
