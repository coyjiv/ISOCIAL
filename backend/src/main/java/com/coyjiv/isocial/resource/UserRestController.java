package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.UserUpdateRequestDto;
import com.coyjiv.isocial.dto.respone.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.UserSearchResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.user.UserDefaultResponseMapper;
import com.coyjiv.isocial.transfer.user.UserSearchResponseMapper;
import com.coyjiv.isocial.transfer.user.UserUpdateRequestMapper;
import jakarta.validation.constraints.Min;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor

@RestController
@RequestMapping("/api/users")
public class UserRestController {
  private final IUserService userService;
  private final UserDefaultResponseMapper userDefaultResponseMapper;
  private final UserUpdateRequestMapper userUpdateRequestMapper;
  private final UserSearchResponseMapper userSearchResponseMapper;

  @GetMapping("/")
  public ResponseEntity<?> findAll(@RequestParam(defaultValue = "1") @Min(1) Integer page,
                                   @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    List<User> users = userService.findAll(page, size);
    List<UserDefaultResponseDto> dtos = users.stream().map(userDefaultResponseMapper::convertToDto).toList();
    return ResponseEntity.ok(dtos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable("id") Long id) {
    Optional<User> user = userService.findById(id);
    if (user.isPresent()) {
      UserDefaultResponseDto dto = userDefaultResponseMapper.convertToDto(user.get());
      return ResponseEntity.ok(dto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/search")
  public ResponseEntity<?> findByName(@RequestParam String name, @RequestParam(defaultValue = "1") int page,
                                      @RequestParam(defaultValue = "10") int size) {
    List<User> users = userService.findByName(name, page, size);
    List<UserSearchResponseDto> dtos = users.stream().map(userSearchResponseMapper::convertToDto).toList();
    return ResponseEntity.ok(dtos);
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().body("Deleted successfully");
  }


  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Map<String,String> fields) {
    userService.updateUser(id,fields);
    return ResponseEntity.ok().body("Updated successfully");
  }

}
