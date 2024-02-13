package com.coyjiv.isocial.dto.respone.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDto {
  private Long id;

  private String textContent;

  private List<String> attachments;

  private boolean isEdited;

  private Long originalPostId;

  private Long authorId;

  private List<String> likes;
}
