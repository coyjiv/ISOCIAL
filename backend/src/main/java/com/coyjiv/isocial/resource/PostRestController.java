package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;
import com.coyjiv.isocial.service.post.IPostService;
import com.coyjiv.isocial.transfer.post.PostResponseMapper;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostRestController {
    private final IPostService postService;
    private final PostResponseMapper postResponseMapper;

    @GetMapping("/")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "1") @Min(0) Integer page,
                                     @RequestParam(defaultValue = "10") @Min(0) Integer size) {
        List<Post> posts = postService.findAllActive(page, size);
        List<PostResponseDto> dtos = posts.stream().map(postResponseMapper::convertToDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findPostByPostId(@PathVariable("id") Long id) {
        Optional<Post> post = postService.findActiveById(id);
        if (post.isPresent()) {
            PostResponseDto dto = postResponseMapper.convertToDto(post.get());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/author/{id}")
    public ResponseEntity<?> findPostsByAuthorId(@PathVariable("id") Long id,
                                                 @RequestParam(defaultValue = "1") @Min(0) Integer page,
                                                 @RequestParam(defaultValue = "10") @Min(0) Integer size) {
        return ResponseEntity.ok(postService.findActiveByAuthorId(page, size, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) {
        postService.delete(id);
        return ResponseEntity.status(204).build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") @Min(0) Long id,
                                    @RequestBody @Valid UpdatePostRequestDto dto) {
        postService.update(id, dto);
        return ResponseEntity.status(204).build();
    }
}
