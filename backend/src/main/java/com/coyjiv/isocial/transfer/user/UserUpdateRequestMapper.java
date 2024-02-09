package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.user.UserUpdateRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class UserUpdateRequestMapper extends DtoMapperFacade<User, UserUpdateRequestDto> {
  private final UserRepository userRepository;

  public UserUpdateRequestMapper(UserRepository userRepository) {
    super(User.class, UserUpdateRequestDto.class);
    this.userRepository = userRepository;
  }


  @Override
  protected void decorateEntity(User entity, UserUpdateRequestDto dto) {
    entity = userRepository.findById(dto.getId()).get();
    entity.setAvatarsUrl(dto.getAvatarsUrl());
    entity.setBio(dto.getBio());
    entity.setCity(dto.getCity());
    entity.setFirstName(dto.getFirstName());
    entity.setLastName(dto.getLastName());
    entity.setBannerUrl(dto.getBannerUrl());
    entity.setDateOfBirth(dto.getDateOfBirth());
    entity.setGender(dto.getGender());
  }
}
