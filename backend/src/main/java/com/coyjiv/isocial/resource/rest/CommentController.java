package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.comment.UpdateCommentRequestDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.comment.ICommentService;
import jakarta.validation.Valid;
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

  @PostMapping("/")
  public ResponseEntity<?> create(@RequestParam(name = "commenterId") Long commenterId,
                                  @RequestParam(name = "postId") Long postId,
                                  @RequestParam(name = "text") String text) {
    return ResponseEntity.ok(commentService.create(commenterId, postId, text));
  }

  @GetMapping("/{postId}")
  public ResponseEntity<?> findByPostId(@PathVariable("postId") Long postId) {
    return ResponseEntity.ok(commentService.findByPostId(postId));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
    commentService.delete(id);
    return ResponseEntity.status(204).build();
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable(name = "id") Long id,
                                  @RequestBody @Valid UpdateCommentRequestDto updateCommentRequestDto)
          throws EntityNotFoundException {
    return ResponseEntity.ok(commentService.update(id, updateCommentRequestDto));
  }
}
