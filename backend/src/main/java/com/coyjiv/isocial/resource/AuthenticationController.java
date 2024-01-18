package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.auth.JwtTokenProvider;
import com.coyjiv.isocial.dto.request.LoginRequestDto;
import com.coyjiv.isocial.dto.request.RefreshRequestDto;
import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.dto.respone.LoginResponseDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;
import com.coyjiv.isocial.service.auth.IAuthService;
import com.coyjiv.isocial.service.user.IUserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
  private final IUserService userService;
  private final IAuthService authService;

  @PostMapping("/registration")
  public ResponseEntity<?> createUser(@RequestBody @Valid UserRegistrationRequestDto requestDto) {
    try {
      userService.createUser(requestDto);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PostMapping("/confirmation")
  public ResponseEntity<?> confirmUser(@RequestParam("email") String email) {
    return userService.findByEmail(email)
            .map(user -> {
              user.setActive(true);
              userService.updateUser(user);
              return ResponseEntity.ok().build();
            })
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with this email not found"));
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
}
