package com.coyjiv.isocial.resource.rest;


import com.coyjiv.isocial.dto.request.postseen.PostSeenRequestDto;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.postseen.IPostSeenService;
import com.coyjiv.isocial.transfer.postseen.PostSeenResponseMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

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
