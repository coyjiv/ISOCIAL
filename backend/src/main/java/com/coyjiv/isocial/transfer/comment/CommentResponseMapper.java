package com.coyjiv.isocial.transfer.comment;

import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class CommentResponseMapper extends DtoMapperFacade<Comment, CommentResponseDto> {
  public CommentResponseMapper() {
    super(Comment.class, CommentResponseDto.class);
  }

  @Override
  protected void decorateDto(CommentResponseDto dto, Comment entity) {
    dto.setCommenterId(entity.getCommenterId());
    dto.setText(entity.getText());
    dto.setPostId(entity.getPostId());
  }
}
