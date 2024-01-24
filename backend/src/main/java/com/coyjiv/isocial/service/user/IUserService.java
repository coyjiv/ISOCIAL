package com.coyjiv.isocial.service.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;
import org.springframework.data.repository.query.Param;

import javax.security.auth.login.AccountNotFoundException;
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

  void confirmUser(String email) throws AccountNotFoundException;

  User updateUser(User user);

  List<User> findByName(String name,int page, int size);

  void deleteUser(Long id);
}
