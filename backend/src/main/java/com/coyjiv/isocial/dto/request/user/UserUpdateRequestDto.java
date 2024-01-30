package com.coyjiv.isocial.dto.request.user;


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
}
