package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.post.PostNotificationDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class PostNotificationMapper extends DtoMapperFacade<Post, PostNotificationDto> {
  private final UserRepository userRepository;

  public PostNotificationMapper(UserRepository userRepository) {

    super(Post.class, PostNotificationDto.class);
    this.userRepository = userRepository;
  }

  protected void decorateDto(PostNotificationDto dto, Post entity) {

    try {
      User author = userRepository.findActiveById(entity.getAuthorId()).get();
      if (!author.getAvatarsUrl().isEmpty()) {
        dto.setSenderAvatarUrl(author.getAvatar());
      }
      dto.setSenderName(author.getFirstName() + " " + author.getLastName());
      dto.setAuthorPremium(author.isPremium());
      dto.setAuthorPremiumNickname(author.getPremiumNickname());
      dto.setAuthorPremiumEmoji(author.getPremiumEmoji());
    } catch (Exception exception) {
      exception.printStackTrace();
    }
  }
}

