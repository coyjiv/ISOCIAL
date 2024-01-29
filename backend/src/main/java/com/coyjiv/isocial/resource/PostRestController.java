package com.coyjiv.isocial.resource;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.dto.request.UserUpdateRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;
import com.coyjiv.isocial.dto.respone.UserResponseDto;
import com.coyjiv.isocial.service.post.IPostService;
import com.coyjiv.isocial.service.post.PostService;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.post.PostResponseMapper;
import com.coyjiv.isocial.transfer.post.PostRequestMapper;
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
@RequestMapping("/api/posts")
public class PostRestController {
    private final PostService postService;
    private final PostResponseMapper postResponseMapper;
    private final PostRequestMapper postRequestMapper;

    @GetMapping("/")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "1") @Min(1) Integer page,
                                     @RequestParam(defaultValue = "10") @Min(0) Integer size) {
        List<Post> posts = postService.findAll(page, size);
        List<PostResponseDto> dtos = posts.stream().map(postResponseMapper::convertToDto).toList();
        return ResponseEntity.ok(dtos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findPostByPostId(@PathVariable("id") Long id) {
        Optional<Post> post = postService.findPostByPostId(id);
        if (post.isPresent()) {
            PostResponseDto dto = postResponseMapper.convertToDto(post.get());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/author/{id}")
    public ResponseEntity<?> findPostsByAuthorId(@PathVariable("id") Long id) {
        List <Post> posts = postService.findPostsByAuthorId(id);
        if (!posts.isEmpty()) {
            List<PostResponseDto> dtos = posts.stream().map(postResponseMapper::convertToDto).toList();
            return ResponseEntity.ok(dtos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id) {
        postService.deleteUser(id);
        return ResponseEntity.ok().body("Deleted successfully");
    }


    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Validated PostRequestDto dto) {
        Post post = postRequestMapper.convertToEntity(dto);
        postService.updatePost(post);
        return ResponseEntity.ok().body(post);
    }
}
