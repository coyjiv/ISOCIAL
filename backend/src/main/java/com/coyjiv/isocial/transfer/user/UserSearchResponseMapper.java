package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.UserSearchResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class UserSearchResponseMapper extends DtoMapperFacade<User, UserSearchResponseDto> {
  public UserSearchResponseMapper() {
    super(User.class, UserSearchResponseDto.class);
  }

  @Override
  protected void decorateDto(UserSearchResponseDto dto, User entity) {
    dto.setId(dto.getId());
    dto.setFirstName(entity.getFirstName());
    dto.setLastName(entity.getLastName());
    dto.setAvatarsUrl(entity.getAvatarsUrl());
  }
}
