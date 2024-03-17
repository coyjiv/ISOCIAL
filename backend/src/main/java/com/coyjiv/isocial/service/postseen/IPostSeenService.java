package com.coyjiv.isocial.service.postseen;

import com.coyjiv.isocial.domain.PostSeen;
import com.coyjiv.isocial.dto.request.postseen.PostSeenRequestDto;
import com.coyjiv.isocial.dto.respone.postseen.PostSeenResponseDto;

import java.util.Optional;

public interface IPostSeenService {
  PostSeenResponseDto create(PostSeenRequestDto postSeenRequestDto);

  Optional<PostSeen> findByUserIdPostId(Long postId);
}
