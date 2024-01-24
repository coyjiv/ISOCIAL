package com.coyjiv.isocial.service.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

public interface IUserService {

  /*
   * Find all users with pagination
   * */
  List<User> findAll(int page, int quantity);

  List<User> findAll();

  Optional<User> findActiveById(Long id);

  Optional<User> findByEmail(String email);
  Optional<User> findActiveByEmail(String email);

  User create(UserRegistrationRequestDto userRegistrationRequestDto) throws PasswordMatchException;

  void confirmUser(String email) throws AccountNotFoundException;

  User update(User user);

  void delete(Long id);
}
