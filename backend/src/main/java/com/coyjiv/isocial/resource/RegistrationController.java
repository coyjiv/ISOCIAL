package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.request.UserRegistrationRequestDto;
import com.coyjiv.isocial.exceptions.PasswordMatchException;
import com.coyjiv.isocial.service.user.IUserService;
import jakarta.validation.Valid;
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
@RequestMapping("/api/registration")
public class RegistrationController {
  private final IUserService userService;

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody @Valid UserRegistrationRequestDto requestDto) {
    try {
      userService.createUser(requestDto);
    } catch (PasswordMatchException e) {
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

}
