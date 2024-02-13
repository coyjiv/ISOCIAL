package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.dao.CommentRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.dto.comment.UpdateCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.transfer.comment.CommentResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService implements ICommentService {
  private final CommentRepository commentRepository;
  private final CommentResponseMapper commentResponseMapper;

  @Transactional(readOnly = true)
  @Override
  public CommentResponseDto findById(Long id) throws EntityNotFoundException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      return commentResponseMapper.convertToDto(comment.get());
    } else {
      throw new EntityNotFoundException("Comment not found");
    }
  }

  @Transactional(readOnly = true)
  @Override
  public List<CommentResponseDto> findByPostId(Long id) {

    return commentRepository.findByPostId(id).stream()
            .map(commentResponseMapper::convertToDto).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public List<CommentResponseDto> findByCommenterId(Long id) {
    return commentRepository.findByCommenterId(id).stream()
            .map(commentResponseMapper::convertToDto).toList();
  }

  @Transactional
  @Override
  public void delete(Long id) {
    Optional<Comment> comment = commentRepository.findById(id);
    comment.ifPresent(commentRepository::delete);
  }

  @Transactional
  @Override
  public Comment create(Long commenterId, Long postId, String text) {
    return commentRepository.save(new Comment(commenterId, postId, text));
  }

  @Transactional
  @Override
  public Comment update(Long id, UpdateCommentRequestDto dto) throws EntityNotFoundException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      comment.get().setText(dto.getText());
      return commentRepository.save(comment.get());
    }
    throw new EntityNotFoundException("Comment not found");
  }
}