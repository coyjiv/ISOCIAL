package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.domain.Role;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserActivityStatus;
import com.coyjiv.isocial.dto.request.user.UserRegistrationRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;

@Service
public class UserRegistrationRequestMapper extends DtoMapperFacade<User, UserRegistrationRequestDto> {
  private final PasswordEncoder passwordEncoder;

  public UserRegistrationRequestMapper(PasswordEncoder passwordEncoder) {
    super(User.class, UserRegistrationRequestDto.class);
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  protected void decorateEntity(User entity, UserRegistrationRequestDto dto) {
    entity.setAvatarsUrl(new ArrayList<>());
    entity.setPassword(passwordEncoder.encode(dto.getPassword()));
    Role userRole = new Role();
    userRole.setName("ROLE_USER");
    userRole.setUser(entity);
    entity.setRoles(Set.of(userRole));
    entity.setActivityStatus(UserActivityStatus.OFFLINE);
  }
}
