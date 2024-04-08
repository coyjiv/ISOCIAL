package com.coyjiv.isocial.dto.respone.userpreference;

import com.coyjiv.isocial.domain.PrivacySetting;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserPreferenceResponseDto {
  private Long userId;
  private PrivacySetting friendsListVisibility;
  private PrivacySetting ageVisibility;
  private PrivacySetting postsVisibility;
  private boolean receiveNotifications;
}
