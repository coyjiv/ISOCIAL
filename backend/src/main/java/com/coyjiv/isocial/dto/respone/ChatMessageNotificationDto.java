package com.coyjiv.isocial.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageNotificationDto {
  private Long messageId;
  private Long chatId;
  private String senderName;
  private String senderAvatarUrl;
  private String text;
}
