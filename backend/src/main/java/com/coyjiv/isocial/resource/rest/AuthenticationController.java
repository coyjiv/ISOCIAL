package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.cache.EmailRegistrationCache;
import com.coyjiv.isocial.dto.request.auth.LoginRequestDto;
import com.coyjiv.isocial.dto.request.auth.PasswordResetRequestDto;
import com.coyjiv.isocial.dto.request.auth.RefreshRequestDto;
import com.coyjiv.isocial.dto.request.user.UserRegistrationRequestDto;
import com.coyjiv.isocial.service.auth.IAuthService;
import com.coyjiv.isocial.service.user.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.login.AccountNotFoundException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
  private final IUserService userService;
  private final IAuthService authService;

  @PostMapping("/registration")
  public ResponseEntity<?> createUser(@RequestBody @Valid UserRegistrationRequestDto requestDto) {
    try {
      userService.create(requestDto);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.status(201).build();
  }

  @PostMapping("/confirmation")
  public ResponseEntity<?> confirmUser(@RequestParam("id") String uuid) {
    String email = EmailRegistrationCache.getEmail(uuid);

    if (email == null) {
      return ResponseEntity.badRequest().body("Link expired");
    }

    try {
      userService.confirmUser(email);
      return ResponseEntity.status(204).build();
    } catch (AccountNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    }
  }


  @PostMapping("/access")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
    try {
      return ResponseEntity.ok(authService.login(loginRequestDto));
    } catch (Exception exception) {
      return ResponseEntity.status(401).body(exception.getMessage());
    }
  }

  @PostMapping("/refresh")
  public ResponseEntity<?> refresh(@Valid @RequestBody RefreshRequestDto refreshRequestDto) {
    try {
      return ResponseEntity.ok(authService.refresh(refreshRequestDto));
    } catch (Exception exception) {
      return ResponseEntity.status(401).body(exception.getMessage());
    }
  }


  @PostMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequestDto passwordResetRequestDto) {
    try {
      userService.resetPassword(passwordResetRequestDto);
      return ResponseEntity.status(200).body("Password reset successfully");
    } catch (UsernameNotFoundException e) {
      return ResponseEntity.status(404).body(e.getMessage());
    }
  }

  @PostMapping("/request-reset-password")
  public ResponseEntity<?> requestPasswordReset(@RequestParam String email) {
    try {
      userService.requestPasswordReset(email);
      return ResponseEntity.status(200).body("Password reset request sent successfully.");
    } catch (UsernameNotFoundException e) {
      return ResponseEntity.status(404).body("User not found");
    }
  }

}
