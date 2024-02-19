package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.CommentRepository;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.comment.DefaultCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.transfer.comment.CommentResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
  private final PostRepository postRepository;

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
  public List<CommentResponseDto> findByPostId(Long id, int page, int size) throws EntityNotFoundException {
    if (postRepository.findActiveById(id).isPresent()) {
      Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
      Pageable pageable = PageRequest.of(page, size, sort);
      return commentRepository.findByPostId(id, pageable).stream()
              .map(commentResponseMapper::convertToDto).toList();
    } else {
      throw new EntityNotFoundException("Comment not found");
    }
  }

  @Transactional(readOnly = true)
  @Override
  public List<CommentResponseDto> findByCommenterId(Long id, int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    return commentRepository.findByCommenterId(id, pageable).stream()
            .map(commentResponseMapper::convertToDto).toList();
  }

  @Transactional
  @Override
  public void delete(Long id) throws IllegalAccessException, EntityNotFoundException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      Optional<Post> post = postRepository.findActiveById(comment.get().getPostId());
      if (post.isPresent()) {
        if (Objects.equals(comment.get().getCommenterId(), emailPasswordAuthProvider.getAuthenticationPrincipal())
                && Objects.equals(post.get().getAuthorId(), emailPasswordAuthProvider.getAuthenticationPrincipal())) {
          comment.get().setActive(false);
          commentRepository.save(comment.get());
        } else {
          throw new IllegalAccessException("User have no authorities to do this request.");
        }
      } else {
        throw new EntityNotFoundException("Post not found");
      }
    } else {
      throw new EntityNotFoundException("Comment not found");
    }
  }

  @Transactional
  @Override
  public Comment create(Long postId, DefaultCommentRequestDto dto) throws EntityNotFoundException {
    if (postRepository.findActiveById(postId).isPresent()) {
      Comment comment = new Comment(emailPasswordAuthProvider.getAuthenticationPrincipal(), postId, dto.getText());
      comment.setActive(true);
      return commentRepository.save(comment);
    } else {
      throw new EntityNotFoundException("Post not found");
    }
  }

  @Transactional
  @Override
  public Comment update(Long id, DefaultCommentRequestDto dto) throws EntityNotFoundException, IllegalAccessException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      if (postRepository.findActiveById(comment.get().getPostId()).isPresent()) {
        if (Objects.equals(comment.get().getCommenterId(), emailPasswordAuthProvider.getAuthenticationPrincipal())) {
          comment.get().setText(dto.getText());
          return commentRepository.save(comment.get());
        } else {
          throw new IllegalAccessException("User have no authorities to do this request.");
        }
      } else {
        throw new EntityNotFoundException("Post not found");
      }
    } else {
      throw new EntityNotFoundException("Comment not found");
    }
  }
}