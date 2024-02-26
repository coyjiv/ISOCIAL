package com.coyjiv.isocial.transfer.comment;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.service.like.ILikeService;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import com.coyjiv.isocial.transfer.user.UserSearchResponseMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CommentResponseMapper extends DtoMapperFacade<Comment, CommentResponseDto> {

  private final IUserService userService;
  private final UserRepository userRepository;
  private final ILikeService likeService;
  private final UserSearchResponseMapper userSearchResponseMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;

  public CommentResponseMapper(IUserService userService, ILikeService likeService, UserRepository userRepository,
                               UserSearchResponseMapper userSearchResponseMapper,
                               EmailPasswordAuthProvider emailPasswordAuthProvider) {
    super(Comment.class, CommentResponseDto.class);
    this.userService = userService;
    this.likeService = likeService;
    this.userRepository = userRepository;
    this.userSearchResponseMapper = userSearchResponseMapper;
    this.emailPasswordAuthProvider = emailPasswordAuthProvider;
  }

  @Override
  protected void decorateDto(CommentResponseDto dto, Comment entity) {
    dto.setCommenterId(entity.getCommenterId());
    dto.setText(entity.getText());
    dto.setPostId(entity.getPostId());
    dto.setId(entity.getId());
    dto.setEdited(entity.isEdited());
    dto.setCreationDate(entity.getCreationDate());
    try {
      dto.setLiked(likeService.isLikedByUser(emailPasswordAuthProvider.getAuthenticationPrincipal(), entity.getId(),
        entity.getEntityType()));
    } catch (Exception e) {
      e.printStackTrace();
      dto.setLiked(false);
    }
    try {
      dto.setAuthorAvatar(userService.getAvatar(entity.getCommenterId()));
    } catch (Exception e) {
      dto.setAuthorAvatar("");
    }
    try {
      dto.setAuthorFullName(userService.getFullName(entity.getCommenterId()));
    } catch (Exception e) {
      dto.setAuthorFullName("");
    }
    try {
      dto.setLikesCount((long) likeService.countLikesByEntity(entity.getId(), entity.getEntityType()));
      dto.setRecentLikedUsers(likeService.getRecentLikes(entity.getId(), entity.getEntityType()).stream()
        .map(like -> {
          User liker = userRepository.findActiveById(like.getUserId()).get();
          return userSearchResponseMapper.convertToDto(liker);
        }).toList());
    } catch (Exception e) {
      dto.setLikesCount(0L);
      dto.setRecentLikedUsers(new ArrayList<>());
    }
    dto.setAuthorPremium(userService.isPremium(entity.getCommenterId()));
    dto.setAuthorPremiumNickname(userService.getPremiumNickname(entity.getCommenterId()));
    dto.setAuthorPremiumEmoji(userService.getPremiumEmoji(entity.getCommenterId()));
  }
}
