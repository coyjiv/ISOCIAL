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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import com.coyjiv.isocial.domain.User;

import javax.security.auth.login.AccountNotFoundException;
import java.util.Optional;


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

  @GetMapping("/active/{email}")
  public ResponseEntity<?> isActive(@PathVariable("email") String email) {
    if (email == null) {
      return ResponseEntity.badRequest().body("Email is required");
    } else {
      boolean isActive = userService.isUserActive(email);
      if (isActive) {
        return ResponseEntity.ok(true);
      } else {
        return ResponseEntity.notFound().build();
      }
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


  @PostMapping("/reset-password/{uuid}")
  public ResponseEntity<?> resetPassword(@PathVariable String uuid, @Valid @RequestBody PasswordResetRequestDto passwordResetRequestDto) {
    try {
      userService.resetPassword(uuid, passwordResetRequestDto);
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
    } catch (UsernameNotFoundException ex) {
      return ResponseEntity.status(404).body("Email not found.");
    }
  }
}
