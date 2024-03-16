package com.coyjiv.isocial.service.like;

import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.LikeableEntity;
import com.coyjiv.isocial.dto.respone.like.LikeInfoResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;

import java.util.List;

public interface ILikeService {

  void toggleLike(Long entityId, LikeableEntity entityType) throws EntityNotFoundException;

  void toggleLike(Long userId, Long entityId, LikeableEntity entityType) throws EntityNotFoundException;

  long countLikesByEntity(Long entityId, LikeableEntity entityType) throws EntityNotFoundException;

  boolean isLikedByUser(Long userId, Long entityId, LikeableEntity entityType) throws EntityNotFoundException;

  List<Like> getRecentLikes(Long entityId, LikeableEntity entityType) throws EntityNotFoundException;

  List<UserProfileResponseDto> getUsersWhoLikedEntity(Long entityId, LikeableEntity entityType)
    throws EntityNotFoundException;

}
