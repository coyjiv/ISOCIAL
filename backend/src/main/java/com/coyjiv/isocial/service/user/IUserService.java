package com.coyjiv.isocial.service.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;

import java.util.List;
import java.util.Optional;

public interface IUserService {

  /*
   * Find all users with pagination
   * */
  List<User> findAll(int page, int quantity);

  List<User> findAll();

  Optional<User> findById(Long id);

  Optional<User> findByEmail(String email);

  User createUser(UserRegistrationRequestDto userRegistrationRequestDto) throws PasswordMatchException;

  User updateUser(User user);

  void deleteUser(Long id);
}
