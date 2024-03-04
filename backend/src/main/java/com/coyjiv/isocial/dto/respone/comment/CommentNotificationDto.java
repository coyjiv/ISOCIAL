package com.coyjiv.isocial.dto.respone.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentNotificationDto {
  private Long postId;
  private String text;
  private String commenterName;
  private String commenterAvatar;
}
