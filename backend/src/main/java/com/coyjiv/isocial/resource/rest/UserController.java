package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.user.IUserService;
import jakarta.validation.constraints.Min;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
  private final IUserService userService;

  @GetMapping
  public ResponseEntity<?> findAll(@RequestParam(defaultValue = "0") @Min(0) Integer page,
                                   @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    return ResponseEntity.ok(userService.findAllActive(page, size));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable("id") Long id) throws EntityNotFoundException {
    return ResponseEntity.ok(userService.findActiveById(id));
  }

  @GetMapping("/search")
  public ResponseEntity<?> findByName(@RequestParam String name, @RequestParam(defaultValue = "0") @Min(0) int page,
                                      @RequestParam(defaultValue = "10") @Min(0) int size) {
    List<UserSearchResponseDto> dtos = userService.findByName(name, page, size);
    return ResponseEntity.ok(dtos);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable("id") @Min(0) Long id, @RequestBody Map<Object, Object> fields)
          throws EntityNotFoundException, IllegalAccessException {
    userService.update(id, fields);
    return ResponseEntity.status(204).build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id)
          throws EntityNotFoundException, IllegalAccessException {
    userService.delete(id);
    return ResponseEntity.status(204).build();
  }


  @MessageMapping("/connect")
  public void handleConnectUser(StompHeaderAccessor accessor) {
    String token = accessor.getFirstNativeHeader("Authorization");
    userService.handleConnect(token);
  }

  @MessageMapping("/disconnect")
  public void handleDisconnectUser(StompHeaderAccessor accessor) {
    String token = accessor.getFirstNativeHeader("Authorization");
    userService.handleDisconnect(token);
  }
}
