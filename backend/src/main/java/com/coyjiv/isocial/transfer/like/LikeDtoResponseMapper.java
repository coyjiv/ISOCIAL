package com.coyjiv.isocial.transfer.like;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.like.LikeInfoResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeDtoResponseMapper extends DtoMapperFacade<Like, LikeInfoResponseDto> {
  private final UserRepository userRepository;

  public LikeDtoResponseMapper(UserRepository userRepository) {
    super(Like.class, LikeInfoResponseDto.class);
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateDto(LikeInfoResponseDto dto, Like entity) {
    User user = userRepository.findActiveById(entity.getUserId()).orElseThrow();
    dto.setUserAvatarUrl(user.getAvatar());
    dto.setUserFirstName(user.getFirstName());
    dto.setUserLastName(user.getLastName());
    dto.setCreatedAt(entity.getCreationDate());
    dto.setUpdatedAt(entity.getLastModifiedDate());
  }
}
