package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PostResponseMapper extends DtoMapperFacade<Post, PostResponseDto> {
  private final UserRepository userRepository;

  public PostResponseMapper(UserRepository userRepository) {

    super(Post.class, PostResponseDto.class);
    this.userRepository = userRepository;
  }

  protected void decorateDto(PostResponseDto dto, Post entity) {

    try {
      User author = userRepository.findActiveById(entity.getAuthorId()).get();
      if (!author.getAvatarsUrl().isEmpty()) {
        dto.setAuthorAvatar(author.getAvatarsUrl().get(0));
      }
      dto.setAuthorFullNane(author.getFirstName() + " " + author.getLastName());
      dto.setAuthorLastSeen(author.getLastSeen());
      dto.setAuthorPremium(author.isPremium());
      dto.setAuthorPremiumNickname(author.getPremiumNickname());
      dto.setAuthorPremiumEmoji(author.getPremiumEmoji());
    } catch (Exception exception) {
      exception.printStackTrace();
    }

  }
}

