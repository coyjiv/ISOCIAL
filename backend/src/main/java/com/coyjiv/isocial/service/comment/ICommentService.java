package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.dto.request.comment.DefaultCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;

import java.util.List;

public interface ICommentService {


  CommentResponseDto findById(Long id) throws EntityNotFoundException;

  PageWrapper<CommentResponseDto> findByPostId(Long id, int page, int size) throws EntityNotFoundException;

  List<CommentResponseDto> findByCommenterId(Long id, int page, int size);

  Long countByPostId(Long id) throws EntityNotFoundException;

  void delete(Long id) throws IllegalAccessException, EntityNotFoundException;

  CommentResponseDto create(Long postId, DefaultCommentRequestDto dto) throws EntityNotFoundException;

  CommentResponseDto update(Long id, DefaultCommentRequestDto dto) throws EntityNotFoundException, IllegalAccessException;

  List<CommentResponseDto> findRecentByPostId(Long id) throws EntityNotFoundException;
}
