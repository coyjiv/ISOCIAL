package com.coyjiv.isocial.service.comment;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.CommentRepository;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Comment;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.comment.DefaultCommentRequestDto;
import com.coyjiv.isocial.dto.respone.comment.CommentResponseDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.websocket.IWebsocketService;
import com.coyjiv.isocial.transfer.comment.CommentResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
  private final IWebsocketService websocketService;

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
  public PageWrapper<CommentResponseDto> findByPostId(Long id, int page, int size) throws EntityNotFoundException {
    if (postRepository.findActiveById(id).isPresent()) {
      Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
      Pageable pageable = PageRequest.of(page, size, sort);
      Page<Comment> postPage = commentRepository.findByPostId(id, pageable);

      List<CommentResponseDto> dtos = commentRepository.findByPostId(id, pageable).stream()
        .map(commentResponseMapper::convertToDto).toList();

      boolean hasNext = postPage.hasNext();

      return new PageWrapper<>(dtos, hasNext);
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

  @Transactional(readOnly = true)
  @Override
  public Long countByPostId(Long id) throws EntityNotFoundException {
    return commentRepository.countByPostId(id);
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
  public CommentResponseDto create(Long postId, DefaultCommentRequestDto dto) throws EntityNotFoundException {
    if (postRepository.findActiveById(postId).isPresent()) {
      Comment comment = new Comment(emailPasswordAuthProvider.getAuthenticationPrincipal(), postId, dto.getText(), false);
      comment.setActive(true);
      CommentResponseDto savedComment =  commentResponseMapper.convertToDto(commentRepository.save(comment));
      websocketService.sendCommentNotification(comment);
      return savedComment;
    } else {
      throw new EntityNotFoundException("Post not found");
    }
  }

  @Transactional
  @Override
  public CommentResponseDto update(Long id, DefaultCommentRequestDto dto)
    throws EntityNotFoundException, IllegalAccessException {
    Optional<Comment> comment = commentRepository.findById(id);
    if (comment.isPresent()) {
      if (postRepository.findActiveById(comment.get().getPostId()).isPresent()) {
        if (Objects.equals(comment.get().getCommenterId(), emailPasswordAuthProvider.getAuthenticationPrincipal())) {
          comment.get().setText(dto.getText());
          comment.get().setEdited(true);
          return commentResponseMapper.convertToDto(commentRepository.save(comment.get()));
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

  @Override
  public List<CommentResponseDto> findRecentByPostId(Long id) throws EntityNotFoundException {
    if (postRepository.findActiveById(id).isPresent()) {
      Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
      Pageable pageable = PageRequest.of(0, 5, sort);
      return commentRepository.findByPostId(id, pageable).stream()
        .map(commentResponseMapper::convertToDto).toList();
    } else {
      throw new EntityNotFoundException("Comment not found");
    }
  }
}