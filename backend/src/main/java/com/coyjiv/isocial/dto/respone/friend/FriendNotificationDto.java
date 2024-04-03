package com.coyjiv.isocial.dto.respone.friend;

import com.coyjiv.isocial.domain.UserGender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendNotificationDto {
  Long friendId;
  Long senderId;
  private String senderName;
  private String senderAvatarUrl;
  private UserGender senderGender;
}
