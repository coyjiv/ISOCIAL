package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.request.subscription.SubscriptionUpdateResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.subscription.ISubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
  private final ISubscriptionService subscriptionService;

  @PostMapping("/subscribe")
  public ResponseEntity<?> subscribe(@Validated @RequestBody SubscriptionUpdateResponseDto dto)
          throws EntityNotFoundException, IllegalAccessException {
    subscriptionService.subscribe(dto.getUserId(), dto.getSubscriberId());
    return ResponseEntity.status(204).build();
  }

  @PostMapping("/unsubscribe")
  public ResponseEntity<?> unsubscribe(@Validated @RequestBody SubscriptionUpdateResponseDto dto)
          throws EntityNotFoundException, IllegalAccessException {
    subscriptionService.unsubscribe(dto.getUserId(), dto.getSubscriberId());
    return ResponseEntity.status(204).build();
  }
}
