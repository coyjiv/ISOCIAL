package com.coyjiv.isocial.resource.rest;


import com.coyjiv.isocial.dto.respone.friend.CustomFriendResponse;
import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.friend.FriendService;

import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friends")
public class FriendController {
  private final FriendService friendService;


  @PostMapping()
  public ResponseEntity<String> sendFriendRequest(@RequestParam Long addresserId)
    throws EntityNotFoundException, IllegalAccessException {
    boolean result = friendService.sendFriendRequest(addresserId);
    if (result) {
      return ResponseEntity.ok("Request sent successfully");
    }
    return ResponseEntity.status(400).body("You already sent request");
  }

  @PostMapping("/accept")
  public ResponseEntity<String> acceptFriendRequest(@RequestParam Long friendId) throws IllegalAccessException {
    boolean result = friendService.acceptFriendRequest(friendId);
    if (result) {
      return ResponseEntity.ok("Accepted");
    }
    return ResponseEntity.status(400).body("You are already friends");
  }

  @PostMapping("/decline")
  public ResponseEntity<String> declineFriendRequest(@RequestParam Long friendId) throws IllegalAccessException {
    boolean result = friendService.declineOrCancelFriendRequest(friendId);
    if (result) {
      return ResponseEntity.ok("Declined");
    }
    return ResponseEntity.status(400).body("Friend request not found");
  }

  @DeleteMapping()
  public ResponseEntity<String> deleteFriend(@RequestParam Long friendId) {
    boolean result = friendService.deleteFriend(friendId);
    if (result) {
      return ResponseEntity.ok("Deleted");
    }
    return ResponseEntity.status(400).body("You are not friends");
  }

  @GetMapping("/{userId}")
  public ResponseEntity<List<FriendResponseDto>> getAllFriends(@PathVariable Long userId,
                                                               @RequestParam(defaultValue = "0") @Min(0) Integer page,
                                                               @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    List<FriendResponseDto> friends = friendService.findAllFriends(userId, page, size);
    return ResponseEntity.ok(friends);
  }

  @GetMapping("/friendsCount/{userId}")
  public ResponseEntity<Long> getFriendsCount(@PathVariable Long userId) {
    try {
      if (userId == null) {
        return ResponseEntity.status(400).body(0L);
      } else {
        Long count = friendService.getFriendsCount(userId);
        return ResponseEntity.ok(count);
      }

    } catch (Exception e) {
      return ResponseEntity.status(400).body(0L);
    }

  }

  @GetMapping("/subscribersCount/{userId}")
  public ResponseEntity<Long> getSubscribersCount(@PathVariable Long userId) {
    try {
      if (userId == null) {
        return ResponseEntity.status(400).body(0L);
      } else {
        Long count = friendService.getSubscribersCount(userId);
        return ResponseEntity.ok(count);
      }

    } catch (Exception e) {
      return ResponseEntity.status(400).body(0L);
    }
  }

  @GetMapping("/availableFriendRequests")
  public ResponseEntity<?> availableFriendRequests(@RequestParam(defaultValue = "0") @Min(0) Integer page,
                                                   @RequestParam(defaultValue = "10") @Min(0) Integer size)
          throws EntityNotFoundException {
    CustomFriendResponse friendRequests = friendService.availableFriendRequests(page, size);
    return ResponseEntity.ok(friendRequests);
  }


}

