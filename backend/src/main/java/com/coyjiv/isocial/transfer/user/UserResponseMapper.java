package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.dto.request.UserUpdateRequestDto;
import com.coyjiv.isocial.dto.respone.UserResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends DtoMapperFacade<User, UserResponseDto> {
  public UserResponseMapper() {
    super(User.class, UserResponseDto.class);
  }

  @Override
  protected void decorateDto(UserResponseDto dto, User entity) {
    dto.setId(dto.getId());
    dto.setBio(entity.getBio());
    dto.setCity(entity.getCity());
    dto.setFirstName(entity.getFirstName());
    dto.setLastName(entity.getLastName());
    dto.setLastSeen(entity.getLastSeen());
  }
}
