package com.coyjiv.isocial.service.userpreference;

import com.coyjiv.isocial.dao.UserPreferenceRepository;
import com.coyjiv.isocial.domain.PrivacySetting;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserPreference;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPreferenceService implements IUserPreferenceService {
  private final UserPreferenceRepository userPreferenceRepository;

  @Override
  @Transactional
  public UserPreference updateUserPreferences(Long userId, Map<String, Object> fields) {
    Optional<UserPreference> preferencesOpt = userPreferenceRepository.findByUserId(userId);

    preferencesOpt.ifPresent(userPreference -> fields.forEach((key, value) -> {
      if (Objects.equals(key, "friendsListVisibility")) {
        userPreference.setFriendsListVisibility(PrivacySetting.valueOf((String) value));
        userPreferenceRepository.save(userPreference);
      } else if (Objects.equals(key, "ageVisibility")) {
        userPreference.setAgeVisibility(PrivacySetting.valueOf((String) value));
        userPreferenceRepository.save(userPreference);
      } else if (Objects.equals(key, "postsVisibility")) {
        userPreference.setPostsVisibility(PrivacySetting.valueOf((String) value));
        userPreferenceRepository.save(userPreference);
      } else if (Objects.equals(key, "receiveNotifications")) {
        userPreference.setReceiveNotifications((boolean) value);
        userPreferenceRepository.save(userPreference);
      }
    }));

    return preferencesOpt.orElse(null);
  }

  @Override
  @Transactional(readOnly = true)
  public UserPreference getUserPreferences(Long userId) {
    Optional<UserPreference> preferencesOpt = userPreferenceRepository.findByUserId(userId);
    return preferencesOpt.orElse(null);
  }

  @Override
  @Transactional
  public UserPreference createUserPreferences(User user) {
    UserPreference preferences = new UserPreference();
    preferences.setUser(user);
    return userPreferenceRepository.save(preferences);
  }
}
