package com.coyjiv.isocial.dto.respone.like;

import com.coyjiv.isocial.domain.LikeableEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LikeInfoResponseDto {
  private Long id;
  private LikeableEntity entityType;
  private Long entityId;
  private Long userId;
  private String userFirstName;
  private String userLastName;
  private String userAvatarUrl;
  private Date createdAt;
  private Date updatedAt;
}
