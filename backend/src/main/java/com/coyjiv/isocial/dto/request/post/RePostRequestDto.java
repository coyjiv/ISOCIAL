package com.coyjiv.isocial.dto.request.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RePostRequestDto {
  @NotBlank
  @Size(max = 1000)
  private String textContent;

  private Long originalPostId;
}
