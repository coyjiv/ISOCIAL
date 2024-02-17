package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.dto.request.comment.DefaultCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;

import java.util.List;

public interface ICommentService {


  CommentResponseDto findById(Long id) throws EntityNotFoundException;

  List<CommentResponseDto> findByPostId(Long id, int page, int size);

  List<CommentResponseDto> findByCommenterId(Long id, int page, int size);

  void delete(Long id) throws IllegalAccessException;

  Comment create(Long postId, DefaultCommentRequestDto dto);

  Comment update(Long id, DefaultCommentRequestDto dto) throws EntityNotFoundException, IllegalAccessException;
}
