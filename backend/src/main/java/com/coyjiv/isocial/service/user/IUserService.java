package com.coyjiv.isocial.service.user;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.auth.PasswordResetRequestDto;
import com.coyjiv.isocial.dto.request.user.UserRegistrationRequestDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.PasswordMatchException;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IUserService {

  /*
   * Find all users with pagination
   * */
  List<UserDefaultResponseDto> findAllActive(int page, int quantity);

  List<UserDefaultResponseDto> findAllActive();

  UserProfileResponseDto findActiveById(Long id) throws EntityNotFoundException;

  Optional<User> findByEmail(String email);

  Optional<User> findActiveByEmail(String email);

  boolean isUserActive(String email);

  User create(UserRegistrationRequestDto userRegistrationRequestDto) throws PasswordMatchException;

  void update(Long id, Map<Object, Object> fields) throws IllegalAccessException, EntityNotFoundException;

  void confirmUser(String email) throws AccountNotFoundException;

  List<UserSearchResponseDto> findByName(String name, int page, int size);

  void delete(Long id) throws IllegalAccessException, EntityNotFoundException;

  void handleConnect(String token) throws IllegalAccessException;

  void handleDisconnect(Long userId);

  void resetPassword(String uuid, PasswordResetRequestDto passwordResetRequestDto);

  void requestPasswordReset(String email);

  String getAvatar(Long id) throws EntityNotFoundException;

  String getFullName(Long id) throws EntityNotFoundException;

  boolean isPremium(Long commenterId);

  String getPremiumNickname(Long commenterId);

  String getPremiumEmoji(Long commenterId);
}
