package com.coyjiv.isocial.service.postSeen;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.*;
import com.coyjiv.isocial.domain.PostSeen;
import com.coyjiv.isocial.dto.request.postSeen.PostSeenRequestDto;
import com.coyjiv.isocial.dto.respone.postSeen.PostSeenResponseDto;
import com.coyjiv.isocial.transfer.postSeen.PostSeenRequestMapper;
import com.coyjiv.isocial.transfer.postSeen.PostSeenResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostSeenService implements IPostSeenService {
  private final PostSeenRepository postSeenRepository;
  private final PostSeenRequestMapper postSeenRequestMapper;
  private final PostSeenResponseMapper postSeenResponseMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;


  @Transactional
  public PostSeenResponseDto create(PostSeenRequestDto postSeenRequestDto){
    Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
    PostSeen postSeen = postSeenRequestMapper.convertToEntity(postSeenRequestDto);
    postSeen.setUserId(requestOwner);
    if (postSeenRepository.findByUserIdPostId(requestOwner, postSeenRequestDto.getPostId()).isPresent()){
      return postSeenResponseMapper.convertToDto(
              postSeenRepository.findByUserIdPostId(requestOwner, postSeenRequestDto.getPostId()).get());
    }
    postSeenRepository.save(postSeen);
    return postSeenResponseMapper.convertToDto(postSeen);
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<PostSeen> findByUserIdPostId(Long postId) {
    Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
    return postSeenRepository.findByUserIdPostId(requestOwner, postId);
  }

}
