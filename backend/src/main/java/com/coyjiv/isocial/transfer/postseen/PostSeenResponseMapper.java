package com.coyjiv.isocial.transfer.postseen;


import com.coyjiv.isocial.domain.PostSeen;
import com.coyjiv.isocial.dto.respone.postseen.PostSeenResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;


@Service
public class PostSeenResponseMapper extends DtoMapperFacade<PostSeen, PostSeenResponseDto> {

  public PostSeenResponseMapper() {
    super(PostSeen.class, PostSeenResponseDto.class);
  }

  protected void decorateDto(PostSeenResponseDto dto, PostSeen entity) {}
}
