package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.service.notifications.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
  private final INotificationService notificationService;


  @GetMapping
  public ResponseEntity<?> findAllActive(@RequestParam("receiverId") Long receiverId,
                                         @RequestParam("page") Integer page,
                                         @RequestParam("quantity") Integer quantity) {
    return ResponseEntity.ok(notificationService.findAllForUser(receiverId,page,quantity));
  }

}

