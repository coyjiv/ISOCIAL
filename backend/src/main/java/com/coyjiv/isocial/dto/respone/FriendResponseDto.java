package com.coyjiv.isocial.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendResponseDto {
  private Long id;
  private String firstName;
  private String lastName;
  private List<String> avatarsUrl;

}
