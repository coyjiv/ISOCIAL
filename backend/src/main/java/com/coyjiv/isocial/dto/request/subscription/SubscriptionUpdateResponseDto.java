package com.coyjiv.isocial.dto.request.subscription;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionUpdateResponseDto {
  @Min(value = 1, message = "User ID must be greater than or equal to 1")
  private Long userId;
}
