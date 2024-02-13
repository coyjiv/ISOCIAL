package com.coyjiv.isocial.dto.request.user;

import com.coyjiv.isocial.domain.UserGender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequestDto {
  @NotBlank
  @Size(min = 2, max = 15)
  private String firstName;
  
  @NotBlank
  @Size(min = 2, max = 15)
  private String lastName;

  @NotBlank
  @Email(message = "Not valid email")
  private String email;

  @NotBlank
  @Size(min = 8, max = 15)
  private String password;

  @Size(min = 8, max = 15)
  private String repeatPassword;

  @NotBlank
  private String city;

  @NotBlank
  @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "must be longer then YYYY-MM-DD")
  private String dateOfBirth;

  @NotNull
  private UserGender gender;
}
