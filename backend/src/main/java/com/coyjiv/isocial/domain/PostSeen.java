package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "post_seen")
public class PostSeen extends AbstractEntity{

  @Column(name = "user_id")
  private Long userId;

  @Column(name = "post_id")
  private Long postId;

}