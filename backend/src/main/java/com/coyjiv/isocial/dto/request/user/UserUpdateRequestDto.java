package com.coyjiv.isocial.dto.request.user;


import com.coyjiv.isocial.domain.UserGender;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDto {

  private Long id;

  @Size(min = 2, max = 15)
  private String firstName;

  @Size(min = 2, max = 15)
  private String lastName;

  private String bio;

  private String city;

  private List<String> avatarsUrl;

  private String bannerUrl;

  private Date dateOfBirth;

  private UserGender gender;

  private boolean isPremium;

  @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "must be one word without special symbols and spaces")
  private String premiumNickname;

  private String premiumEmoji;
}
