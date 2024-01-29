package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.respone.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
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
    return ResponseEntity.ok(userService.findAllActive(page, size));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable("id") Long id) {
    try {
      return ResponseEntity.ok(userService.findActiveById(id));
    } catch (EntityNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    }
  }

  @GetMapping("/search")
  public ResponseEntity<?> findByName(@RequestParam String name, @RequestParam(defaultValue = "0") @Min(0) int page,
                                      @RequestParam(defaultValue = "10") @Min(0) int size) {
    List<UserSearchResponseDto> dtos = userService.findByName(name, page, size);
    return ResponseEntity.ok(dtos);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable("id") @Min(0) Long id, @RequestBody Map<String, String> fields) {
    try {
      userService.update(id, fields);
      return ResponseEntity.ok().body("Updated successfully");
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (EntityNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) {
    try {
      userService.delete(id);
      return ResponseEntity.status(204).build();
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (EntityNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    }

  }

}
