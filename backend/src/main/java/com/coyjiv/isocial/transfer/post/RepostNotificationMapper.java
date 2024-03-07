package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.post.RepostNotificationDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class RepostNotificationMapper extends DtoMapperFacade<Post, RepostNotificationDto> {
  private final EmailPasswordAuthProvider authProvider;
  private final UserRepository userRepository;

  public RepostNotificationMapper(EmailPasswordAuthProvider authProvider, UserRepository userRepository) {
    super(Post.class, RepostNotificationDto.class);
    this.authProvider = authProvider;
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateDto(RepostNotificationDto dto, Post entity) {
    dto.setPostId(entity.getId());
    User user = userRepository.findActiveById(authProvider.getAuthenticationPrincipal()).orElseThrow();
    dto.setSenderId(user.getId());
    dto.setSenderAvatarUrl(user.getAvatarsUrl().size()>0
            ? user.getAvatarsUrl().get(0):"");
    dto.setSenderName(user.getFirstName() + " " + user.getLastName());
    dto.setText(entity.getTextContent());
  }
}
