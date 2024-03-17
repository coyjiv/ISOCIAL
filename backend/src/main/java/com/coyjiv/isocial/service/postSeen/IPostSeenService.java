package com.coyjiv.isocial.service.postSeen;

import com.coyjiv.isocial.domain.PostSeen;
import com.coyjiv.isocial.dto.request.postSeen.PostSeenRequestDto;
import com.coyjiv.isocial.dto.respone.postSeen.PostSeenResponseDto;

import java.util.Optional;

public interface IPostSeenService {
  PostSeenResponseDto create(PostSeenRequestDto postSeenRequestDto);
  Optional<PostSeen> findByUserIdPostId(Long postId);
}
