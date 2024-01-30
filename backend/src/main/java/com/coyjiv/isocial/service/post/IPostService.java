package com.coyjiv.isocial.service.post;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.dto.request.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;

import java.util.List;
import java.util.Optional;

public interface IPostService {

    List<Post> findAllActive(int page, int size);
    Optional<Post> findActiveById(Long id);
    List<PostResponseDto> findActiveByAuthorId(int page, int size, Long id);
    Post create(PostRequestDto postRequestDto);
    void update(Long id, UpdatePostRequestDto updatePostRequestDto);
    void delete(Long id);



    }
