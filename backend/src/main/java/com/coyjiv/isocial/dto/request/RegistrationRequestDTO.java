package com.coyjiv.isocial.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
public class RegistrationRequestDTO {
  @NotBlank
  @Size(min = 2,max = 15)
  private String firstName;
  @NotBlank
  @Size(min = 2,max = 15)
  private String lastName;
  @NotBlank
  @Email(message = "Not valid email")
  private String email;
  @NotBlank
  @Size(min = 8,max = 15)
  private String password;
  @NotBlank
  private String city;
  @NotBlank
  @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "must be longer then YYYY-MM-DD")
  private String dOb;
}
