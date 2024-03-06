package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment extends AbstractEntity implements Likeable {
  @Column(name = "commenter_id")
  private Long commenterId;

  @Column(name = "post_id")
  private Long postId;

  @Column(name = "text")
  private String text;

  @Column(name = "is_edited")
  private boolean isEdited;

  @Override
  public LikeableEntity getEntityType() {
    return LikeableEntity.COMMENT;
  }
}
