package com.coyjiv.isocial.transfer.comment;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
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
    try {
      User commenter = userRepository.findActiveById(entity.getCommenterId()).orElseThrow();
      dto.setCommenterId(entity.getCommenterId());
      dto.setText(entity.getText());
      dto.setPostId(entity.getPostId());
      dto.setId(entity.getId());
      dto.setEdited(entity.isEdited());
      dto.setCreationDate(entity.getCreationDate());
      dto.setLiked(likeService.isLikedByUser(emailPasswordAuthProvider.getAuthenticationPrincipal(), entity.getId(),
              entity.getEntityType()));
      dto.setAuthorAvatar(commenter.getAvatar());
      dto.setAuthorFullName(commenter.getFullName());
      dto.setLikesCount(likeService.countLikesByEntity(entity.getId(), entity.getEntityType()));
      dto.setRecentLikedUsers(likeService.getRecentLikes(entity.getId(), entity.getEntityType()).stream()
              .map(like -> {
                User liker = userRepository.findActiveById(like.getUserId()).orElseThrow();
                return userSearchResponseMapper.convertToDto(liker);
              }).toList());
      dto.setAuthorPremium(userService.isPremium(entity.getCommenterId()));
      dto.setAuthorPremiumNickname(userService.getPremiumNickname(entity.getCommenterId()));
      dto.setAuthorPremiumEmoji(userService.getPremiumEmoji(entity.getCommenterId()));
    } catch (EntityNotFoundException exception) {
      throw new RuntimeException(exception);
    }
  }
}
