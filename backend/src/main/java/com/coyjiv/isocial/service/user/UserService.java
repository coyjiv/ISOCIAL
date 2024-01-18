package com.coyjiv.isocial.service.user;


import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;
import com.coyjiv.isocial.service.email.EmailServiceImpl;
import com.coyjiv.isocial.transfer.user.UserRegistrationRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
  private final UserRepository userRepository;
  private final UserRegistrationRequestMapper userRegistrationRequestMapper;
  private final EmailServiceImpl emailService;

  @Transactional(readOnly = true)
  @Override
  public List<User> findAll(int page, int quantity) {
    return null;
  }

  @Transactional(readOnly = true)
  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Transactional
  @Override
  public User createUser(UserRegistrationRequestDto userRegistrationDto) throws PasswordMatchException {
    if (!userRegistrationDto.getPassword().equals(userRegistrationDto.getRepeatPassword())) {
      throw new PasswordMatchException("Repeat password should match original password");
    }
    if (userRepository.existsUserByEmail(userRegistrationDto.getEmail())) {
      throw new BadCredentialsException("User with this email already exists");
    }
    User user = userRegistrationRequestMapper.convertToEntity(userRegistrationDto);

    String text = String.format("Open link to confirm your account ! Link: domen.com/confirmation?email=%s",
            user.getEmail());

    emailService.sendSimpleMessage(
            userRegistrationDto.getEmail(), "Account confirmation",
            text
    );

    return userRepository.save(user);
  }

  @Transactional
  @Override
  public User updateUser(User user) {
    return userRepository.save(user);
  }

  @Transactional
  @Override
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
