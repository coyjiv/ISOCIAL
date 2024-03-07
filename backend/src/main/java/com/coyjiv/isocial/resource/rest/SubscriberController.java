package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.subscriber.ISubscriberService;
import com.coyjiv.isocial.service.subscriber.ListSubscriberService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/subscribers")
public class SubscriberController {
  private final ISubscriberService subscriberService;
  private final ListSubscriberService listSubscriberService;

  @GetMapping
  public ResponseEntity<?> getSubscribersCount() {
    return ResponseEntity.ok(subscriberService.getSubscribersCount());
  }

  @GetMapping("/subscriptions")
  public ResponseEntity<?> getSubscriptions(@RequestParam(defaultValue = "0") @Min(0) Integer page,
                                            @RequestParam(defaultValue = "10") @Min(0) Integer size)
          throws EntityNotFoundException {
    return ResponseEntity.ok(listSubscriberService.getSubscriptions(page,size));
  }

  @GetMapping("/subscribed")
  public ResponseEntity<?> getSubscribers(@RequestParam(defaultValue = "0") @Min(0) Integer page,
                                          @RequestParam(defaultValue = "10") @Min(0) Integer size)
          throws EntityNotFoundException {
    return ResponseEntity.ok(listSubscriberService.getSubscribers(page, size));
  }
}
