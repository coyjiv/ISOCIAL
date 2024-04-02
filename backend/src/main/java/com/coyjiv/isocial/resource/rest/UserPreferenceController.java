package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.domain.UserPreference;
import com.coyjiv.isocial.service.userpreference.IUserPreferenceService;
import com.coyjiv.isocial.transfer.userpreference.UserPreferenceResponseMapper;
import io.sentry.Sentry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/settings")
public class UserPreferenceController {
  private final IUserPreferenceService userPreferenceService;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;
  private final UserPreferenceResponseMapper userPreferenceResponseMapper;

  @PatchMapping("/update")
  public ResponseEntity<?> updateUserPreferences(@RequestBody Map<String, Object> updatedPreferences) {
    try {
      UserPreference
        userPreference = userPreferenceService.updateUserPreferences(emailPasswordAuthProvider.getAuthenticationPrincipal(),
        updatedPreferences);
      return ResponseEntity.ok(userPreferenceResponseMapper.convertToDto(userPreference));
    } catch (Exception e) {
      Sentry.captureException(e);
      e.printStackTrace();
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping
  public ResponseEntity<?> getUserPreferences() {
    try {
      UserPreference userPreference =
        userPreferenceService.getUserPreferences(emailPasswordAuthProvider.getAuthenticationPrincipal());
      return ResponseEntity.ok(userPreferenceResponseMapper.convertToDto(userPreference));
    } catch (Exception e) {
      Sentry.captureException(e);
      e.printStackTrace();
      return ResponseEntity.notFound().build();
    }
  }
}
