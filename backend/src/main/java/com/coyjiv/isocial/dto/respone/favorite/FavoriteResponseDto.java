package com.coyjiv.isocial.dto.respone.favorite;

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
public class FavoriteResponseDto {
  private Long id;

  private Long selectorId;

  private Long selectedPostId;

  private String textContent;

  private List<String> attachments;

  private boolean isEdited;

  private Long originalPostId;

  private Long authorId;

  private String authorAvatar;

  private String authorFullName;

  private Date authorLastSeen;

  private boolean isAuthorPremium;

  private String authorPremiumNickname;

  private String authorPremiumEmoji;
}
