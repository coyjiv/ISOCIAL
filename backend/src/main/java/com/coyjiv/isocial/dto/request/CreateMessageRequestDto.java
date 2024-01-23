package com.coyjiv.isocial.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessageRequestDto {

  @NotBlank
  private Long senderId;

  @NotBlank
  private String text;

  private List<String> attachements;

}
