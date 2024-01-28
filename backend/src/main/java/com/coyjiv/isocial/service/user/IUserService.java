package com.coyjiv.isocial.service.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.dto.respone.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IUserService {

  /*
   * Find all users with pagination
   * */
  List<UserDefaultResponseDto> findAll(int page, int quantity);

  List<UserDefaultResponseDto> findAll();

  Optional<UserDefaultResponseDto> findById(Long id);

  Optional<User> findByEmail(String email);

  User createUser(UserRegistrationRequestDto userRegistrationRequestDto) throws PasswordMatchException;

  void confirmUser(String email) throws AccountNotFoundException;

  void updateUser(Long id, Map<String, String> fields);

  List<UserSearchResponseDto> findByName(String name, int page, int size);

  void deleteUser(Long id);
}
