package com.coyjiv.isocial.transfer.like;

import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.like.LikeInfoResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeDtoResponseMapper extends DtoMapperFacade<Like, LikeInfoResponseDto> {
  private final IUserService userService;

  public LikeDtoResponseMapper(IUserService userService) {
    super(Like.class, LikeInfoResponseDto.class);
    this.userService = userService;
  }

  @Override
  protected void decorateDto(LikeInfoResponseDto dto, Like entity) {
    dto.setId(entity.getId());
    dto.setEntityType(entity.getEntityType());
    dto.setEntityId(entity.getEntityId());
    dto.setUserId(entity.getUserId());
    try {
      dto.setUserAvatarUrl(userService.findActiveById(entity.getUserId()).getAvatarsUrl().get(0));
    } catch (Exception e) {
      e.printStackTrace();
      dto.setUserAvatarUrl("");
    }
    try {
      dto.setUserFirstName(userService.findActiveById(entity.getUserId()).getFirstName());
      dto.setUserLastName(userService.findActiveById(entity.getUserId()).getLastName());
    } catch (Exception e) {
      e.printStackTrace();
      dto.setUserFirstName("");
      dto.setUserLastName("");
    }
    dto.setCreatedAt(entity.getCreationDate());
    dto.setUpdatedAt(entity.getLastModifiedDate());

  }
}
