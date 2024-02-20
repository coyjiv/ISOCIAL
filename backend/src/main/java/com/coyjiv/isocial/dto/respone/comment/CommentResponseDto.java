package com.coyjiv.isocial.dto.respone.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
  private Long id;
  private Long commenterId;
  private Long postId;
  private String text;
}
