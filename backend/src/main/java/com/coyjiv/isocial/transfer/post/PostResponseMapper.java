package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.dao.CommentRepository;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.service.like.ILikeService;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import com.coyjiv.isocial.transfer.user.UserSearchResponseMapper;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PostResponseMapper extends DtoMapperFacade<Post, PostResponseDto> {
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;
  private final ILikeService likeService;
  private final UserSearchResponseMapper userSearchResponseMapper;

  public PostResponseMapper(UserRepository userRepository, ILikeService likeService,
                            UserSearchResponseMapper userSearchResponseMapper ,
                            CommentRepository commentRepository) {

    super(Post.class, PostResponseDto.class);
    this.userRepository = userRepository;
    this.likeService = likeService;
    this.userSearchResponseMapper = userSearchResponseMapper;
    this.commentRepository = commentRepository;
  }

  protected void decorateDto(PostResponseDto dto, Post entity) {

    try {
      User author = userRepository.findActiveById(entity.getAuthorId()).get();
      if (!author.getAvatarsUrl().isEmpty()) {
        dto.setAuthorAvatar(author.getAvatarsUrl().get(0));
      }
      dto.setAuthorFullName(author.getFirstName() + " " + author.getLastName());
      dto.setAuthorLastSeen(author.getLastSeen());
      dto.setAuthorPremium(author.isPremium());
      dto.setAuthorPremiumNickname(author.getPremiumNickname());
      dto.setAuthorPremiumEmoji(author.getPremiumEmoji());
      dto.setLikesCount((long) likeService.countLikesByEntity(entity.getId(), entity.getEntityType()));
      dto.setLiked(likeService.isLikedByUser(entity.getAuthorId(), entity.getId(), entity.getEntityType()));
      dto.setRecentLikedUsers(likeService.getRecentLikes(entity.getId(), entity.getEntityType()).stream()
        .map(like -> {
          User liker = userRepository.findActiveById(like.getUserId()).get();
          return userSearchResponseMapper.convertToDto(liker);
        }).toList());
      dto.setCommentsCount(commentRepository.findAllActiveByPostIdNonPageable(entity.getId()).size());
    } catch (Exception exception) {
      exception.printStackTrace();
    }

  }
}

