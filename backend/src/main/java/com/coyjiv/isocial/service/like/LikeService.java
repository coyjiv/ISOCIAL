package com.coyjiv.isocial.service.like;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.LikeRepository;
import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.LikeableEntity;
import com.coyjiv.isocial.domain.NotificationEvent;
import com.coyjiv.isocial.dto.respone.like.LikeInfoResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.notifications.INotificationService;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.service.websocket.IWebsocketService;
import com.coyjiv.isocial.transfer.like.LikeDtoResponseMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService implements ILikeService {
  private final LikeRepository likeRepository;
  private final IUserService userService;
  private final IWebsocketService websocketService;
  private final INotificationService notificationService;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;

  @Transactional
  @Override
  public long countLikesByEntity(Long entityId, LikeableEntity entityType) throws EntityNotFoundException {
    if (entityType == null) {
      throw new EntityNotFoundException("Entity type is required");
    }
    if (entityId == null) {
      throw new EntityNotFoundException("Entity id is required");
    }
    return likeRepository.countByEntityIdAndEntityType(entityId, entityType);
  }

  @Transactional
  @Override
  public boolean isLikedByUser(Long userId, Long entityId, LikeableEntity entityType) throws EntityNotFoundException {
    if (userId == null) {
      throw new EntityNotFoundException("User id is required");
    }
    if (entityType == null) {
      throw new EntityNotFoundException("Entity type is required");
    }
    if (entityId == null) {
      throw new EntityNotFoundException("Entity id is required");
    }
    return likeRepository.existsByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);
  }

  @Transactional
  @Override
  public List<Like> getRecentLikes(Long entityId, LikeableEntity entityType) throws EntityNotFoundException {
    if (entityType == null) {
      throw new EntityNotFoundException("Entity type is required");
    }
    if (entityId == null) {
      throw new EntityNotFoundException("Entity id is required");
    }
    Pageable topTen = PageRequest.of(0, 10);
    return likeRepository.getRecentLikes(entityId, entityType, topTen);
  }

  @Transactional
  @Override
  public List<UserProfileResponseDto> getUsersWhoLikedEntity(Long entityId, LikeableEntity entityType)
    throws EntityNotFoundException {
    if (entityType == null) {
      throw new EntityNotFoundException("Entity type is required");
    }
    if (entityId == null) {
      throw new EntityNotFoundException("Entity id is required");
    }
    int pageSize = 1000; // Example large enough value, adjust based on expected data size

    Page<Like> page = likeRepository.findByEntityIdAndEntityType(entityId, entityType, PageRequest.of(0, pageSize));
    List<Like> likes = page.getContent();

    // Convert likes to UserProfileResponseDto, handling possible EntityNotFoundException
    return likes.stream().map(like -> {
      try {
        return userService.findActiveById(like.getUserId());
      } catch (EntityNotFoundException e) {
        e.printStackTrace();
        return null;
      }
    }).filter(Objects::nonNull) // Remove nulls in case of not found users
      .distinct().collect(Collectors.toList());
  }


  @Transactional
  @Override
  public void toggleLike(Long entityId, LikeableEntity entityType) {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();

    Optional<Like> optionalLike  = likeRepository.findByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);

    if (optionalLike.isPresent()) {
      Like like = optionalLike.get();
      likeRepository.deleteByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);
      notificationService.delete(userId,entityId, like.getCreationDate());
    } else {
      Like like = new Like();
      like.setUserId(userId);
      like.setEntityId(entityId);
      like.setEntityType(entityType);
      likeRepository.save(like);
      websocketService.sendLikeNotificationToUser(like);
    }
  }

  @Transactional
  @Override
  public void toggleLike(Long userId, Long entityId, LikeableEntity entityType) throws EntityNotFoundException {
    if (entityType == null) {
      throw new EntityNotFoundException("Entity type is required");
    }
    if (entityId == null) {
      throw new EntityNotFoundException("Entity id is required");
    }
    if (userId == null) {
      throw new EntityNotFoundException("User id is required");
    }
    boolean exists = likeRepository.existsByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);
    if (exists) {
      likeRepository.deleteByUserIdAndEntityIdAndEntityType(userId, entityId, entityType);
    } else {
      Like like = new Like();
      like.setUserId(userId);
      like.setEntityId(entityId);
      like.setEntityType(entityType);
      likeRepository.save(like);
    }
  }
}
