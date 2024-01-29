package com.coyjiv.isocial.resource;


import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.FriendResponseDto;
import com.coyjiv.isocial.service.friend.FriendService;

import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friends")
public class FriendController {
  private final FriendService friendService;


  @PostMapping("/request")
  public ResponseEntity<String> sendFriendRequest(@RequestParam Long requesterId, @RequestParam Long addresserId) {
    boolean result = friendService.sendFriendRequest(requesterId, addresserId);
    if (result) {
      return ResponseEntity.ok("Request sent successfully");
    }
    return ResponseEntity.ok("You already sent request");
  }

  @PutMapping("/accept")
  public ResponseEntity<String> acceptFriendRequest(@RequestParam Long userId, @RequestParam Long friendId) {
    boolean result = friendService.acceptFriendRequest(userId, friendId);
    if (result) {
      return ResponseEntity.ok("Accepted");
    }
    return ResponseEntity.ok("You are already friends");
  }

  @PutMapping("/decline")
  public ResponseEntity<String> declineFriendRequest(@RequestParam Long userId, @RequestParam Long friendId) {
    boolean result = friendService.declineFriendRequest(userId, friendId);
    if (result) {
      return ResponseEntity.ok("Declined");
    }
    return ResponseEntity.ok("Friend request not found");
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteFriend(@RequestParam Long userId, @RequestParam Long friendId) {
    boolean result = friendService.deleteFriend(userId, friendId);
    if (result) {
      return ResponseEntity.ok("Deleted");
    }
    return ResponseEntity.ok("You are not friends");
  }

  @GetMapping("/all/{userId}")
  public ResponseEntity<List<FriendResponseDto>> getAllFriends(@PathVariable Long userId,
                                                               @RequestParam(defaultValue = "1") @Min(1) Integer page,
                                                               @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    List<FriendResponseDto> friends = friendService.findAllFriends(userId, page, size);
    return ResponseEntity.ok(friends);
  }


}

