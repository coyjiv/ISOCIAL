package com.coyjiv.isocial.service.user;


import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.auth.JwtTokenProvider;
import com.coyjiv.isocial.cache.EmailRegistrationCache;
import com.coyjiv.isocial.cache.PasswordResetCache;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserActivityStatus;
import com.coyjiv.isocial.dto.request.auth.PasswordResetRequestDto;
import com.coyjiv.isocial.domain.UserGender;
import com.coyjiv.isocial.dto.request.user.UserRegistrationRequestDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.PasswordMatchException;
import com.coyjiv.isocial.service.email.EmailServiceImpl;
import com.coyjiv.isocial.transfer.user.UserDefaultResponseMapper;
import com.coyjiv.isocial.transfer.user.UserProfileResponseDtoMapper;
import com.coyjiv.isocial.transfer.user.UserRegistrationRequestMapper;
import com.coyjiv.isocial.transfer.user.UserSearchResponseMapper;
import io.sentry.Sentry;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;

import javax.security.auth.login.AccountNotFoundException;
import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
  private final UserProfileResponseDtoMapper userProfileResponseDtoMapper;
  private final EmailPasswordAuthProvider authProvider;
  private final JwtTokenProvider jwtTokenProvider;
  @Value("${HOSTNAME}")
  private String hostname;
  private final BCryptPasswordEncoder passwordEncoder;


  @Transactional(readOnly = true)
  @Override
  public PageWrapper<UserDefaultResponseDto> findAllActive(int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<User> users = userRepository.findAll(pageable);

    List<UserDefaultResponseDto> dtos = users.stream()
            .map(userDefaultResponseMapper::convertToDto).toList();

    boolean hasNext = users.hasNext();
    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  @Override
  public List<UserDefaultResponseDto> findAllActive() {
    return userRepository.findAll().stream()
            .map(userDefaultResponseMapper::convertToDto).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public UserProfileResponseDto findActiveById(Long id) throws EntityNotFoundException {
    Optional<User> userOptional = userRepository.findActiveById(id);

    if (userOptional.isPresent()) {
      return userProfileResponseDtoMapper.convertToDto(userOptional.get());
    } else {
      throw new EntityNotFoundException("User not found");
    }
  }


  @Transactional(readOnly = true)
  @Override
  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<User> findActiveByEmail(String email) {
    return userRepository.findActiveByEmail(email);
  }

  @Override
  public boolean isUserActive(String email) {
    return userRepository.existsActiveUserByEmail(email);
  }

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<UserSearchResponseDto> findByName(String name, int page, int size) {
    Set<User> result = new HashSet<>();
    String[] splittedNames = name.trim().split(" ");

    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    boolean hasNext = false;
    if (splittedNames.length > 1) {
      Page<User> u = userRepository.findByFirstNameOrLastName(splittedNames[0], pageable);
      result.addAll(u.toList());
      if (u.hasNext()) {
        hasNext = u.hasNext();
      }

      u = userRepository.findByFirstNameOrLastName(splittedNames[1], pageable);
      if (u.hasNext()) {
        hasNext = u.hasNext();
      }
      result.addAll(u.toList());
    } else {
      Page<User> u = userRepository.findByFirstNameOrLastName(splittedNames[0], pageable);
      hasNext = u.hasNext();
      result.addAll(u.toList());
    }

    List<UserSearchResponseDto> dtos = result.stream()
            .map(userSearchResponseMapper::convertToDto).toList();

    return new PageWrapper<>(dtos, hasNext);
  }

  //  @Transactional
  //  public void sendConfirmationEmail(String email, String name, String confirmationLink) {
  //    try {
  //      emailService.sendHtmlMessageWithParams(
  //        email, "Account confirmation",
  //        "", Map.of("name", name, "confirmationLink", confirmationLink, "appLink", hostname)
  //      );
  //    } catch (Exception e) {
  //      e.printStackTrace();
  //    }
  //  }
  @Transactional
  @Override
  public User create(UserRegistrationRequestDto userRegistrationDto) throws PasswordMatchException {
    if (!userRegistrationDto.getPassword().equals(userRegistrationDto.getRepeatPassword())) {
      throw new PasswordMatchException("Repeat password should match original password");
    }
    if (userRepository.existsUserByEmail(userRegistrationDto.getEmail())) {
      throw new BadCredentialsException("User with this email already exists");
    }
    User user = userRegistrationRequestMapper.convertToEntity(userRegistrationDto);

    String uuidForConfirmationLink = EmailRegistrationCache.putEmail(user.getEmail());


    String text = String.format("Open link to confirm your account ! Link: %s/confirmation?id=%s",
            hostname, uuidForConfirmationLink);

    userRepository.save(user);

    emailService.sendSimpleMessage(
            userRegistrationDto.getEmail(), "Account confirmation",
            text
    );

    //    sendConfirmationEmail(userRegistrationDto.getEmail(), userRegistrationDto.getFirstName(), text);

    return user;
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
  public void update(Long id, Map<Object, Object> fields)
          throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    if (!Objects.equals(id, requestOwnerId)) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }

    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      fields.forEach((key, value) -> {
        String stringKey = (String) key;
        if (Objects.equals(stringKey, "email") || Objects.equals(stringKey, "password")
                || Objects.equals(stringKey, "activity_status") || Objects.equals(stringKey, "last_seen")) {
          return;
        }
        if (Objects.equals(key, "gender")) {
          User genderUser = user.get();
          genderUser.setGender(UserGender.valueOf((String) value));
          userRepository.save(genderUser);
        } else if (Objects.equals(key, "premium")) {
          User premiumUser = user.get();
          if ((boolean) value) {
            premiumUser.setPremium(true);
          } else {
            premiumUser.setPremium(false);
          }
          userRepository.save(premiumUser);
        } else if (Objects.equals(key, "dateOfBirth")) {
          String dateString = (String) value;
          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
          try {
            Date date = dateFormat.parse(dateString);
            Field field = ReflectionUtils.findField(User.class, (String) key);
            if (field != null) {
              field.setAccessible(true);
              ReflectionUtils.setField(field, user.get(), date);
            }
          } catch (ParseException e) {
            Sentry.captureException(e);
            e.printStackTrace();
          }
        } else {
          Field field = ReflectionUtils.findField(User.class, (String) key);
          if (field != null) {
            field.setAccessible(true);
            ReflectionUtils.setField(field, user.get(), value);
          }
        }
      });
      userRepository.save(user.get());
    } else {
      throw new EntityNotFoundException("User not found.");
    }
  }


  @Transactional
  @Override
  public void delete(Long id) throws IllegalAccessException, EntityNotFoundException {
    Long requestOwnerId = authProvider.getAuthenticationPrincipal();
    if (!Objects.equals(id, requestOwnerId)) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }

    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      user.get().setActive(false);
    } else {
      throw new EntityNotFoundException("User not found.");
    }
  }

  @Transactional
  @Override
  public void handleConnect(String token) throws IllegalAccessException {
    try {
      jwtTokenProvider.validateAccessToken(token);
    } catch (Exception e) {
      Sentry.captureException(e);
      throw new IllegalAccessException("Token not valid");
    }
    Long userId = authProvider.getAuthenticationPrincipal();
    if (userId != null) {
      Optional<User> userOptional = userRepository.findActiveById(userId);
      if (userOptional.isPresent()) {
        User user = userOptional.get();
        user.setActivityStatus(UserActivityStatus.ONLINE);
        userRepository.save(user);
      }
    }
  }

  @Transactional
  @Override
  public void handleDisconnect(Long userId) {
    Optional<User> userOptional = userRepository.findActiveById(userId);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      user.setActivityStatus(UserActivityStatus.OFFLINE);
      user.setLastSeen(new Date());
      userRepository.save(user);
    }
  }

  @Transactional
  @Override
  public void resetPassword(String uuid, PasswordResetRequestDto passwordResetRequestDto) {
    String email = PasswordResetCache.getEmail(uuid);
    System.out.println(email);
    if (email != null) {
      Optional<User> optionalUser = userRepository.findByEmail(email);
      if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(passwordResetRequestDto.getNewPassword()));
        userRepository.save(user);
      } else {
        throw new UsernameNotFoundException("No user found with email: " + email);
      }
    } else {
      throw new UsernameNotFoundException("No user found with this email ");
    }
  }

  @Transactional
  @Override
  public void requestPasswordReset(String email) {
    Optional<User> user = userRepository.findByEmail(email);
    if (user.isEmpty()) {
      throw new UsernameNotFoundException("Email not found");
    }
    String uuid = PasswordResetCache.putEmail(email);
    emailService.sendPasswordResetMessage(email, uuid);
  }

  @Override
  public String getAvatar(Long id) throws EntityNotFoundException {
    return userRepository.findActiveById(id)
            .map(User::getAvatar)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
  }

  @Override
  public String getFullName(Long id) throws EntityNotFoundException {
    return userRepository.findActiveById(id)
            .map(User::getFullName)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
  }

  @Override
  public boolean isPremium(Long commenterId) {
    return userRepository.findActiveById(commenterId)
            .map(User::isPremium)
            .orElse(false);
  }

  @Override
  public String getPremiumNickname(Long commenterId) {
    return userRepository.findActiveById(commenterId)
            .map(User::getPremiumNickname)
            .orElse("");
  }

  @Override
  public String getPremiumEmoji(Long commenterId) {
    return userRepository.findActiveById(commenterId)
            .map(User::getPremiumEmoji)
            .orElse("");
  }
}
