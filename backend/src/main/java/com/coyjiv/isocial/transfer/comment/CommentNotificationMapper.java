package com.coyjiv.isocial.transfer.comment;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.comment.CommentNotificationDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class CommentNotificationMapper extends DtoMapperFacade<Comment, CommentNotificationDto> {
  private UserRepository userRepository;

  public CommentNotificationMapper(UserRepository userRepository) {
    super(Comment.class, CommentNotificationDto.class);
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateDto(CommentNotificationDto dto, Comment entity) {
    User commenter = userRepository.findById(entity.getCommenterId()).orElseThrow();
    dto.setCommenterAvatar(commenter.getAvatar());
    dto.setCommenterName(String.format("%s %s", commenter.getFirstName(), commenter.getLastName()));
  }
}
