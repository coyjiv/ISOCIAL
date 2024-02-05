package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Post extends AbstractEntity {
  @Column(name = "text_content")
  private String textContent;

  @Column(name = "attachments")
  private List<String> attachments;

  @Column(name = "is_edited")
  private boolean isEdited;

  @Column(name = "original_post_id")
  private Long originalPostId;

  @Column(name = "user_id")
  private Long authorId;

}
