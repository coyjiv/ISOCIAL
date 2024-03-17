package com.coyjiv.isocial.transfer.postSeen;


import com.coyjiv.isocial.domain.PostSeen;
import com.coyjiv.isocial.dto.request.postSeen.PostSeenRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;





@Service
public class PostSeenRequestMapper extends DtoMapperFacade<PostSeen, PostSeenRequestDto> {
  public PostSeenRequestMapper() {
    super(PostSeen.class, PostSeenRequestDto.class);
  }

  @Override
  protected void decorateEntity(PostSeen entity, PostSeenRequestDto dto) {
    entity.setActive(true);
  }
}
