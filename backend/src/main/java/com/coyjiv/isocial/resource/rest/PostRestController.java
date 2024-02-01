package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.request.post.RePostRequestDto;
import com.coyjiv.isocial.dto.request.post.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;
import com.coyjiv.isocial.exceptions.RequestValidationException;
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

    @PostMapping("/")
    public ResponseEntity<?> create( @RequestBody @Valid PostRequestDto dto) throws RequestValidationException {
        return ResponseEntity.ok(postService.create(dto));
    }
    @PostMapping("/repost")
    public ResponseEntity<?> repost( @RequestBody @Valid RePostRequestDto dto) throws RequestValidationException {
        return ResponseEntity.ok(postService.repost(dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) throws IllegalAccessException {
        postService.delete(id);
        return ResponseEntity.status(204).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") @Min(0) Long id,
                                    @RequestBody @Valid UpdatePostRequestDto dto) throws IllegalAccessException {
        postService.update(id, dto);
        return ResponseEntity.status(204).build();
    }

}
