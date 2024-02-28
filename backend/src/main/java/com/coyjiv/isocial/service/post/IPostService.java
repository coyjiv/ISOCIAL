package com.coyjiv.isocial.service.post;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.request.post.RePostRequestDto;
import com.coyjiv.isocial.dto.request.post.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;

import java.util.List;
import java.util.Optional;

public interface IPostService {

  List<Post> findAllActive(int page, int size);

  Optional<Post> findActiveById(Long id);

  PageWrapper<PostResponseDto> findActiveByAuthorId(int page, int size, Long id);

  PostResponseDto create(PostRequestDto postRequestDto) throws RequestValidationException;

  PostResponseDto update(Long id, UpdatePostRequestDto updatePostRequestDto) throws IllegalAccessException;

  void delete(Long id) throws IllegalAccessException, RequestValidationException;

  PostResponseDto repost(RePostRequestDto rePostRequestDto) throws IllegalAccessException, EntityNotFoundException;


}
