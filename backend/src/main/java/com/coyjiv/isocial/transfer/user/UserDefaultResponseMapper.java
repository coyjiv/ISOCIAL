package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class UserDefaultResponseMapper extends DtoMapperFacade<User, UserDefaultResponseDto> {
  public UserDefaultResponseMapper() {
    super(User.class, UserDefaultResponseDto.class);
  }

  @Override
  protected void decorateDto(UserDefaultResponseDto dto, User entity) {
    dto.setId(dto.getId());
    dto.setBio(entity.getBio());
    dto.setCity(entity.getCity());
    dto.setFirstName(entity.getFirstName());
    dto.setLastName(entity.getLastName());
    dto.setLastSeen(entity.getLastSeen());
    dto.setBannerUrl(entity.getBannerUrl());
    dto.setAvatarsUrl(entity.getAvatarsUrl());
    dto.setGender(entity.getGender());
  }
}
