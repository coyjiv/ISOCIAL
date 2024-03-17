package com.coyjiv.isocial.dto.respone.postSeen;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostSeenResponseDto {

  private Long userId;

  private Long postId;
}