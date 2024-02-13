package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.dto.comment.UpdateCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ICommentService {


  CommentResponseDto findById(Long id) throws EntityNotFoundException;

  List<CommentResponseDto> findByPostId(Long id);

  List<CommentResponseDto> findByCommenterId(Long id);

  void delete(Long id);

  Comment create(Long commenterId, Long postId, String text);

  @Transactional
  Comment update(Long id, UpdateCommentRequestDto dto) throws EntityNotFoundException;
}
