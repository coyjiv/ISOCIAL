package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostRequestMapper extends DtoMapperFacade<Post, PostRequestDto> {
  public PostRequestMapper() {
    super(Post.class, PostRequestDto.class);
  }

  @Override
  protected void decorateEntity(Post entity, PostRequestDto dto) {
    entity.setActive(true);
    entity.setEdited(false);
    if (dto.getAttachments() == null) {
      entity.setAttachments(List.of());
    }
    if (dto.getTextContent() == null) {
      entity.setTextContent("");
    }
  }

}
