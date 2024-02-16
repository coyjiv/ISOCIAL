package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.CommentRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.dto.comment.DefaultCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.transfer.comment.CommentResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService implements ICommentService {
  private final CommentRepository commentRepository;
  private final CommentResponseMapper commentResponseMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;

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
  public void delete(Long id) throws IllegalAccessException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      if (Objects.equals(comment.get().getCommenterId(), emailPasswordAuthProvider.getAuthenticationPrincipal())) {
        comment.get().setActive(false);
        commentRepository.save(comment.get());
      } else {
        throw new IllegalAccessException("User have no authorities to do this request.");
      }
    }
  }

  @Transactional
  @Override
  public Comment create(Long postId, DefaultCommentRequestDto dto) {
    Comment comment = new Comment(emailPasswordAuthProvider.getAuthenticationPrincipal(), postId, dto.getText());
    comment.setActive(true);
    return commentRepository.save(comment);
  }

  @Transactional
  @Override
  public Comment update(Long id, DefaultCommentRequestDto dto) throws EntityNotFoundException, IllegalAccessException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      if (Objects.equals(comment.get().getCommenterId(), emailPasswordAuthProvider.getAuthenticationPrincipal())) {
        comment.get().setText(dto.getText());
        return commentRepository.save(comment.get());
      } else {
        throw new IllegalAccessException("User have no authorities to do this request.");
      }
    } else {
      throw new EntityNotFoundException("Comment not found");
    }
  }
}