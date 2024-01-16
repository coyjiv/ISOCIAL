package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserRegistrationRequestMapper extends DtoMapperFacade<User, UserRegistrationRequestDto> {
  public UserRegistrationRequestMapper() {
    super(User.class,UserRegistrationRequestDto.class);
  }

  @Override
  protected void decorateEntity(User entity, UserRegistrationRequestDto dto) {
    entity.setAvatarsUrl(new ArrayList<>());
  }
}
