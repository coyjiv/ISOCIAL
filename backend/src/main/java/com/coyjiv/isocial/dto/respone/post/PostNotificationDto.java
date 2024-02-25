package com.coyjiv.isocial.dto.respone.post;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostNotificationDto {

  private Long id;

  private Long authorId;

  private String authorAvatar;

  private String authorFullNane;

  private boolean isAuthorPremium;

  private String authorPremiumNickname;

  private String authorPremiumEmoji;

}
