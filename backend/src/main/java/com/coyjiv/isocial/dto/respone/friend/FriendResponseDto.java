package com.coyjiv.isocial.dto.respone.friend;

import com.coyjiv.isocial.domain.UserGender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendResponseDto {
  private Long id;
  private String firstName;
  private String lastName;
  private UserGender gender;
  private String city;
  private String birthPlace;
  private String studyPlace;
  private Date dateOfBirth;
  private List<String> avatarsUrl;
}
