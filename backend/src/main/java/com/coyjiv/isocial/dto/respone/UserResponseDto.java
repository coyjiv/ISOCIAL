package com.coyjiv.isocial.dto.respone;

import jakarta.persistence.Column;
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
public class UserResponseDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String city;
  private String bio;
  private Date lastSeen;
  private List<String> avatarsUrl;
  private String bannerUrl;
}
