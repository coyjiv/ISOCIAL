package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.request.post.RePostRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RePostRequestMapper extends DtoMapperFacade<Post, RePostRequestDto> {
  public RePostRequestMapper() {
    super(Post.class, RePostRequestDto.class);
  }

  @Override
  protected void decorateEntity(Post entity, RePostRequestDto dto) {
    entity.setActive(true);
    entity.setEdited(false);
    entity.setAttachments(List.of());
    if (dto.getTextContent() == null) {
      entity.setTextContent("");
    }
  }
}
