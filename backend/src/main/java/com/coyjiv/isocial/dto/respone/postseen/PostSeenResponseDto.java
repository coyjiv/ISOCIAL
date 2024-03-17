package com.coyjiv.isocial.dto.respone.postseen;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostSeenResponseDto {

  private Long userId;

  private Long postId;
}