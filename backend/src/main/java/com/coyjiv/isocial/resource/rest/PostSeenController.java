package com.coyjiv.isocial.resource.rest;


import com.coyjiv.isocial.dto.request.postSeen.PostSeenRequestDto;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.postSeen.IPostSeenService;
import com.coyjiv.isocial.transfer.postSeen.PostSeenResponseMapper;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/postseen")
public class PostSeenController {
  private final IPostSeenService postSeenService;
  private final PostSeenResponseMapper postSeenResponseMapper;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody @Valid PostSeenRequestDto dto)
          throws RequestValidationException {
    return ResponseEntity.ok(postSeenService.create(dto));
  }
  @GetMapping("/{id}")
  public ResponseEntity<?> findByUserIdPostId(@PathVariable("id") Long id) {
    return ResponseEntity.ok(postSeenService.findByUserIdPostId(id));
  }

}
