package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.respone.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.UserSearchResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import jakarta.validation.constraints.Min;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
import java.util.Optional;


@RequiredArgsConstructor

@RestController
@RequestMapping("/api/users")
public class UserRestController {
  private final IUserService userService;

  @GetMapping("/")
  public ResponseEntity<?> findAll(@RequestParam(defaultValue = "0") @Min(0) Integer page,
                                   @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    List<UserDefaultResponseDto> dtos = userService.findAll(page, size);
    return ResponseEntity.ok(dtos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable("id") Long id) {
    Optional<UserDefaultResponseDto> dto = userService.findById(id);
    if (dto.isPresent()) {
      return ResponseEntity.ok(dto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/search")
  public ResponseEntity<?> findByName(@RequestParam String name, @RequestParam(defaultValue = "0") @Min(0) int page,
                                      @RequestParam(defaultValue = "10") @Min(0) int size) {
    List<UserSearchResponseDto> dtos = userService.findByName(name, page, size);
    return ResponseEntity.ok(dtos);
  }


  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().body("Deleted successfully");
  }


  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable("id") @Min(0) Long id, @RequestBody Map<String, String> fields) {
    userService.updateUser(id, fields);
    return ResponseEntity.ok().body("Updated successfully");
  }

}
