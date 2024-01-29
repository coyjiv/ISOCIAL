package com.coyjiv.isocial.service.user;


import com.coyjiv.isocial.cache.EmailRegistrationCache;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.dto.respone.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;
import com.coyjiv.isocial.service.email.EmailServiceImpl;
import com.coyjiv.isocial.transfer.user.UserDefaultResponseMapper;
import com.coyjiv.isocial.transfer.user.UserRegistrationRequestMapper;
import com.coyjiv.isocial.transfer.user.UserSearchResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import javax.security.auth.login.AccountNotFoundException;
import java.lang.reflect.Field;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
  private final UserRepository userRepository;
  private final UserRegistrationRequestMapper userRegistrationRequestMapper;
  private final EmailServiceImpl emailService;
  private final UserSearchResponseMapper userSearchResponseMapper;
  private final UserDefaultResponseMapper userDefaultResponseMapper;


  @Transactional(readOnly = true)
  @Override
  public List<UserDefaultResponseDto> findAll(int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    return userRepository.findAll(pageable).toList().stream()
            .map(userDefaultResponseMapper::convertToDto).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public List<UserDefaultResponseDto> findAll() {
    return userRepository.findAll().stream()
            .map(userDefaultResponseMapper::convertToDto).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<UserDefaultResponseDto> findById(Long id) {
    User user = null;
    if (userRepository.findById(id).isPresent()) {
      user = userRepository.findById(id).get();
      return Optional.ofNullable(userDefaultResponseMapper.convertToDto(user));
    }
    return Optional.empty();
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

    String uuidForConfirmationLink = EmailRegistrationCache.putEmail(user.getEmail());


    String text = String.format("Open link to confirm your account ! Link: http://localhost:9000/confirmation?id=%s",
            uuidForConfirmationLink);

    emailService.sendSimpleMessage(
            userRegistrationDto.getEmail(), "Account confirmation",
            text
    );
    return userRepository.save(user);
  }

  @Transactional
  @Override
  public void confirmUser(String email) throws AccountNotFoundException {
    Optional<User> user = findByEmail(email);
    if (user.isPresent()) {
      user.get().setActive(true);
      userRepository.save(user.get());
    } else {
      throw new AccountNotFoundException("User with this email not found");
    }
  }

  @Transactional
  @Override
  public void updateUser(Long id, Map<String, String> fields) {
    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      fields.forEach((key, value) -> {
        Field field = ReflectionUtils.findField(User.class, key);
        if (field != null) {
          field.setAccessible(true);
          ReflectionUtils.setField(field, user.get(), value);
        }
      });
      userRepository.save(user.get());
    }
  }

  @Transactional(readOnly = true)
  @Override
  public List<UserSearchResponseDto> findByName(String name, int page, int size) {
    Set<User> result = new HashSet<>();
    String[] splittedNames = name.trim().split(" ");

    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    if (splittedNames.length > 1) {
      result.addAll(userRepository.findByFirstNameOrLastName(splittedNames[0],pageable));
      result.addAll(userRepository.findByFirstNameOrLastName(splittedNames[1],pageable));
    } else {
      result.addAll(userRepository.findByFirstNameOrLastName(splittedNames[0],pageable));
    }

    return result.stream()
            .map(userSearchResponseMapper::convertToDto).toList();
  }

  @Transactional
  @Override
  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
