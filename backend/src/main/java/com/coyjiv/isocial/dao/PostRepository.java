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

    @Query("FROM Post p WHERE p.isActive = true")
    List<Post> findAllActive(Pageable pageable);

    @Query("FROM Post p WHERE p.authorId = :id AND p.isActive = true")
    List<Post> findActiveByAuthorId(@Param("id") Long id, Pageable pageable);

    @Query("FROM Post p WHERE p.id = :id AND p.isActive = true")
    Optional<Post> findActiveById(@Param("id") Long id);
}
