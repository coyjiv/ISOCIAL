package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.request.comment.DefaultCommentRequestDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.comment.ICommentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
  private final ICommentService commentService;

  @PostMapping("")
  public ResponseEntity<?> create(@RequestParam(name = "postId") Long postId,
                                  @RequestBody @Valid DefaultCommentRequestDto defaultCommentRequestDto)
          throws EntityNotFoundException {
    return ResponseEntity.ok(commentService.create(postId, defaultCommentRequestDto));
  }

  @GetMapping("/{postId}")
  public ResponseEntity<?> findByPostId(@PathVariable("postId") Long postId,
                                        @RequestParam(defaultValue = "0") @Min(0) Integer page,
                                        @RequestParam(defaultValue = "10") @Min(0) Integer size)
          throws EntityNotFoundException {
    return ResponseEntity.ok(commentService.findByPostId(postId, page, size));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable(name = "id") Long id)
          throws IllegalAccessException, EntityNotFoundException {
    commentService.delete(id);
    return ResponseEntity.status(204).build();
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable(name = "id") Long id,
                                  @RequestBody @Valid DefaultCommentRequestDto defaultCommentRequestDto)
          throws EntityNotFoundException, IllegalAccessException {
    return ResponseEntity.ok(commentService.update(id, defaultCommentRequestDto));
  }
}
