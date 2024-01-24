package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserUpdateRequestDto;
import com.coyjiv.isocial.dto.respone.UserResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.user.UserResponseMapper;
import com.coyjiv.isocial.transfer.user.UserUpdateRequestMapper;
import jakarta.validation.constraints.Min;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor

@RestController
@RequestMapping("/api/users")
public class UserRestController {
  private final IUserService userService;
  private final UserResponseMapper userResponseMapper;
  private final UserUpdateRequestMapper userUpdateRequestMapper;

  @GetMapping("/")
  public ResponseEntity<?> findAll(@RequestParam(defaultValue = "1") @Min(1) Integer page,
                                   @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    List<User> users = userService.findAll(page, size);
    List<UserResponseDto> dtos = users.stream().map(userResponseMapper::convertToDto).toList();
    return ResponseEntity.ok(dtos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable("id") Long id) {
    Optional<User> user = userService.findById(id);
    if (user.isPresent()) {
      UserResponseDto dto = userResponseMapper.convertToDto(user.get());
      return ResponseEntity.ok(dto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/search")
  public ResponseEntity<?> findByName(@RequestParam String name, @RequestParam(defaultValue = "1") int page,
                                      @RequestParam(defaultValue = "10") int size) {
    List<User> users = userService.findByName(name, page, size);
    List<UserResponseDto> dtos = users.stream().map(userResponseMapper::convertToDto).toList();
    return ResponseEntity.ok(dtos);
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().body("Deleted successfully");
  }


  @PutMapping("/update")
  public ResponseEntity<?> update(@RequestBody @Validated UserUpdateRequestDto dto) {
    User user = userUpdateRequestMapper.convertToEntity(dto);
    userService.updateUser(user);
    return ResponseEntity.ok().body(user);
  }

}
