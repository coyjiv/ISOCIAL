package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Comment;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
  @Query("FROM Comment c WHERE c.postId = :postId AND c.isActive = true")
  List<Comment> findByPostId(@Param("postId") Long postId, Pageable pageable);

  @Query("FROM Comment c WHERE c.commenterId = :commenterId AND c.isActive = true")
  List<Comment> findByCommenterId(@Param("commenterId") Long commenterId, Pageable pageable);

  @Query("FROM Comment c WHERE c.postId = :postId AND c.isActive = true")
  List<Comment> findAllActiveByPostIdNonPageable(@Param("postId") Long postId);

  @Query("FROM Comment c WHERE c.id = :id AND c.isActive = true")
  @NotNull
  Optional<Comment> findById(@NotNull Long id);

  @Query("SELECT COUNT(c) FROM Comment c WHERE c.postId = :postId AND c.isActive = true")
  Long countByPostId(@Param("postId") Long id);
}

