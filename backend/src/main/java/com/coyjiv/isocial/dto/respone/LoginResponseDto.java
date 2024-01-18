package com.coyjiv.isocial.dto.respone;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
  private final String type = "Bearer";
  private String access;
  private String refresh;
}
