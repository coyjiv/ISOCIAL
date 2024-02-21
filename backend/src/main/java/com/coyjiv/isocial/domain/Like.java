package com.coyjiv.isocial.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "likes")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Like extends AbstractEntity {
  @Column(name = "user_id")
  private Long userId;

  @Column(name = "entity_id")
  private Long entityId;

  @Column(name = "entity_type")
  @Enumerated(EnumType.STRING)
  private LikeableEntity entityType;
}
