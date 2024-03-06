package com.coyjiv.isocial.dto.respone.comment;

import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
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
public class CommentResponseDto {
  private Long id;
  private Long commenterId;
  private Long postId;
  private String text;
  private String authorAvatar;
  private String authorFullName;
  private boolean isEdited;
  private Long likesCount;
  private boolean isLiked;
  private List<UserSearchResponseDto> recentLikedUsers;
  private boolean isAuthorPremium;
  private String authorPremiumNickname;
  private String authorPremiumEmoji;
  private Date creationDate;
}
