package com.coyjiv.isocial.dto.respone.message;

import com.coyjiv.isocial.domain.MessageStatus;
import com.coyjiv.isocial.domain.UserGender;
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
public class MessageNotificationDto {
  private Long id;
  private Long messageId;
  private Long chatId;
  private Long senderId;
  private String senderName;
  private String senderAvatarUrl;
  private String text;
  private MessageStatus status;
  private List<String> attachments;
  private boolean isEdited;
  private Date creationDate;
  private Date lastModifiedDate;
  private UserGender senderGender;

}
