package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
  @Query("FROM Comment c WHERE c.postId = :postId")
  List<Comment> findByPostId(@Param("postId") Long postId);

  @Query("FROM Comment c WHERE c.commenterId = :commenterId")
  List<Comment> findByCommenterId(@Param("commenterId") Long commenterId);
}

