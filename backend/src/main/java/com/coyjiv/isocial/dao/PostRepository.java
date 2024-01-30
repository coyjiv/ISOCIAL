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

    @Query("from Post p where p.is_active = true")
    List<Post> findAllActive(Pageable pageable);

    @Query("from Post p where p.user_id = :id and p.is_active = true")
    List<Post> findActiveByAuthorId(@Param("id") Long id, Pageable pageable);

    @Query("from Post p where p.id = :id and p.is_active = true")
    Optional<Post> findActiveById(@Param("id") Long id);
}
