package com.coyjiv.isocial.dto.respone.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RepostNotificationDto {
  private Long postId;
  private Long senderId;
  private String senderName;
  private String senderAvatarUrl;
  private String text;
}
