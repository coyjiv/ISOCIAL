package com.coyjiv.isocial.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_preferences")
public class UserPreference extends AbstractEntity {
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  @JsonIgnore
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(name = "friends_list_visibility")
  private PrivacySetting friendsListVisibility = PrivacySetting.ALL;

  @Enumerated(EnumType.STRING)
  @Column(name = "age_visibility")
  private PrivacySetting ageVisibility = PrivacySetting.ALL;

  @Enumerated(EnumType.STRING)
  @Column(name = "posts_visibility")
  private PrivacySetting postsVisibility = PrivacySetting.ALL;

  @Column(name = "receive_notifications")
  private boolean receiveNotifications = true;
}
