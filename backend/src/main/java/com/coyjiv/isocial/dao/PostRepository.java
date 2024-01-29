package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Override
    Page<Post> findAll(Pageable pageable);

    @Query("from Post p where p.user_id = :id")
    List<Post> findPostsByAuthorId(@Param("id") Long id);

    @Query("from Post p where p.id = :id")
    Optional<Post> findPostByPostId(@Param("id") Long id);
}
