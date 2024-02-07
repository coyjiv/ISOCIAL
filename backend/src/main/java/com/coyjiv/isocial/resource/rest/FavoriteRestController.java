package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.favorite.FavoriteRequestDto;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.request.post.RePostRequestDto;
import com.coyjiv.isocial.dto.request.post.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.favorite.IFavoriteService;
import com.coyjiv.isocial.service.post.IPostService;
import com.coyjiv.isocial.transfer.favorite.FavoriteResponseMapper;
import com.coyjiv.isocial.transfer.post.PostResponseMapper;
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

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favorites")
public class FavoriteRestController {
  private final IFavoriteService favoriteService;
  private final FavoriteResponseMapper favoriteResponseMapper;

  @GetMapping
  public ResponseEntity<?> findAll(@RequestParam(defaultValue = "0") @Min(0) Integer page,
                                   @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    return ResponseEntity.ok(favoriteService.findAllActive(page, size));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findFavoriteById(@PathVariable("id") Long id) {
    Optional<Favorite> favorite = favoriteService.findActiveById(id);
    if (favorite.isPresent()) {
      FavoriteResponseDto dto = favoriteResponseMapper.convertToDto(favorite.get());
      return ResponseEntity.ok(dto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/post/{id}")
  public ResponseEntity<?> findFavoritesByPostId(@PathVariable("id") Long id) {
    return ResponseEntity.ok(favoriteService.findActiveByPostId(id));
  }

  @GetMapping("/selector/{id}")
  public ResponseEntity<?> findFavoritesBySelectorId(@PathVariable("id") Long id,
                                                     @RequestParam(defaultValue = "0") @Min(0) Integer page,
                                                     @RequestParam(defaultValue = "10") @Min(0) Integer size) {
    return ResponseEntity.ok(favoriteService.findActiveBySelectorId(page, size, id));
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody @Valid FavoriteRequestDto dto)
          throws EntityNotFoundException, IllegalAccessException {
    return ResponseEntity.status(201).body(favoriteService.create(dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") @Min(0) Long id)
          throws IllegalAccessException, RequestValidationException {
    favoriteService.delete(id);
    return ResponseEntity.status(204).build();
  }

}
