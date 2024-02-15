package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.request.subscription.SubscriptionUpdateResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.subscription.ISubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
  private final ISubscriptionService subscriptionService;

  @PostMapping
  public ResponseEntity<?> subscribe(@Validated @RequestBody SubscriptionUpdateResponseDto dto)
          throws IllegalAccessException, RequestValidationException {
    subscriptionService.subscribe(dto.getUserId());
    return ResponseEntity.status(201).build();
  }

  @DeleteMapping
  public ResponseEntity<?> unsubscribe(@Validated @RequestBody SubscriptionUpdateResponseDto dto)
          throws EntityNotFoundException, IllegalAccessException {
    subscriptionService.unsubscribe(dto.getUserId());
    return ResponseEntity.status(204).build();
  }
}
