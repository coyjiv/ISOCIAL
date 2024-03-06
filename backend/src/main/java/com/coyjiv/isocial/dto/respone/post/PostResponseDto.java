package com.coyjiv.isocial.dto.respone.post;

import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PostResponseDto {
  private Long id;

  private String textContent;

  private List<String> attachments;

  private boolean isEdited;

  private Long originalPostId;

  private PostResponseDto originalPost;

  private Long authorId;

  private String authorAvatar;

  private String authorFullName;

  private Date authorLastSeen;

  private Long likesCount;

  private List<UserSearchResponseDto> recentLikedUsers;

  private Long commentsCount;

  private List<CommentResponseDto> recentComments;

  private boolean isAuthorPremium;

  private boolean isLiked;

  private boolean isFavourite;

  private String authorPremiumNickname;

  private String authorPremiumEmoji;

  private Date creationDate;

}
