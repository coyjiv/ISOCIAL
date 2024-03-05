package com.coyjiv.isocial.dto.respone.like;

import com.coyjiv.isocial.domain.LikeableEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LikeNotificationDto {
  private Long entityId;
  private String likerName;
  private String likerAvatar;
  private LikeableEntity entityType;
}
