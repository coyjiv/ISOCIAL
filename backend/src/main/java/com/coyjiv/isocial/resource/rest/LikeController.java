package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.domain.LikeableEntity;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.like.ILikeService;
import io.sentry.Sentry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {
  private final ILikeService likeService;

  @PostMapping("/toggle")
  public ResponseEntity<?> toggleLike(@RequestParam("entityId") Long entityId,
                                      @RequestParam("entityType") String entityType) {
    try {
      likeService.toggleLike(entityId, LikeableEntity.valueOf(entityType));
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      Sentry.captureException(e);
      e.printStackTrace();
      return ResponseEntity.notFound().build();
    }
  }
}
