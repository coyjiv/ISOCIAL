package com.coyjiv.isocial.transfer.like;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.like.LikeNotificationDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class LikeNotificationDtoMapper extends DtoMapperFacade<Like, LikeNotificationDto> {
  private final UserRepository userRepository;

  public LikeNotificationDtoMapper(UserRepository userRepository) {
    super(Like.class, LikeNotificationDto.class);
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateDto(LikeNotificationDto dto, Like entity) {
    User liker = userRepository.findById(entity.getUserId()).orElseThrow();
    dto.setLikerAvatar(liker.getAvatar());
    dto.setLikerName(liker.getFullName());
    dto.setSenderGender(liker.getGender());
    dto.setSenderId(liker.getId());
  }
}
