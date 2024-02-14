package com.coyjiv.isocial.dto.respone.user;

import com.coyjiv.isocial.domain.UserActivityStatus;
import com.coyjiv.isocial.domain.UserGender;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDefaultResponseDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String city;
  private String bio;
  private Date lastSeen;
  private UserActivityStatus activityStatus;
  private List<String> avatarsUrl;
  private String bannerUrl;
  private UserGender gender;
  private Long friendsCount;
}
