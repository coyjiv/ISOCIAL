package com.coyjiv.isocial.transfer.friend;

import com.coyjiv.isocial.domain.User;

import com.coyjiv.isocial.dto.respone.FriendResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class FriendResponseMapper extends DtoMapperFacade<User, FriendResponseDto> {
  public FriendResponseMapper() {
    super(User.class, FriendResponseDto.class);
  }

  @Override
  protected void decorateEntity(User entity, FriendResponseDto dto) {
    dto.setLastName(entity.getLastName());
    dto.setFirstName(entity.getFirstName());
    dto.setAvatarsUrl(entity.getAvatarsUrl());
  }
}
