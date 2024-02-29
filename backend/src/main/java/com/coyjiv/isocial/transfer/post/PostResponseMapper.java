package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class PostResponseMapper extends DtoMapperFacade<Post, PostResponseDto> {
  public PostResponseMapper() {
    super(Post.class, PostResponseDto.class);
  }

}
