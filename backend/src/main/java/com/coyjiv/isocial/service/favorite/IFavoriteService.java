package com.coyjiv.isocial.service.favorite;

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

import java.util.List;
import java.util.Optional;

public interface IFavoriteService {
  List<FavoriteResponseDto> findAllActive(int page, int size);

  Optional<Favorite> findActiveById(Long id);

  Optional<Favorite> findActiveBySelectorIdPostId(Long postId);

  List<FavoriteResponseDto> findActiveBySelectorId(int page, int size, Long id);

  List<FavoriteResponseDto> findActiveByPostId( Long id);

  Favorite create(FavoriteRequestDto favoriteRequestDto) throws EntityNotFoundException, IllegalAccessException;

  void delete(Long id,boolean noPermission) throws IllegalAccessException, RequestValidationException;

  boolean isFavorite(Long postId) throws EntityNotFoundException;

}
