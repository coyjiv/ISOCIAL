package com.coyjiv.isocial.service.userpreference;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserPreference;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;

import java.util.Map;

public interface IUserPreferenceService {
  UserPreference updateUserPreferences(Long userId, Map<String, Object> fields);

  UserPreference getUserPreferences(Long userId);

  UserPreference createUserPreferences(User user) throws EntityNotFoundException;
}
