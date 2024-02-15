package com.coyjiv.isocial.transfer.favorite;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.favorite.FavoriteRequestDto;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.service.post.IPostService;
import com.coyjiv.isocial.service.post.PostService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteResponseMapper extends DtoMapperFacade<Favorite, FavoriteResponseDto> {
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  public FavoriteResponseMapper(PostRepository postRepository, UserRepository userRepository) {
    super(Favorite.class, FavoriteResponseDto.class);
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  protected void decorateDto(FavoriteResponseDto dto, Favorite entity) {
    dto.setId(entity.getId());
    dto.setSelectedPostId(entity.getSelectedPostId());
    dto.setSelectorId(entity.getSelectorId());
    try {
      Post post = postRepository.findActiveById(entity.getSelectedPostId()).get();
      dto.setTextContent(post.getTextContent());
      dto.setEdited(post.isEdited());
      dto.setOriginalPostId(post.getOriginalPostId());
      dto.setAuthorId(post.getAuthorId());
      dto.setAttachments(post.getAttachments());
      User author = userRepository.findActiveById(post.getAuthorId()).get();
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
