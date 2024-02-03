package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Favorite;
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
public interface FavoriteRepository extends JpaRepository<Favorite, Long>  {
    @Query("FROM Favorite f WHERE f.id = :id AND f.isActive = true")
    Optional<Favorite> findActiveById(@Param("id") Long id);

    @Query("FROM Favorite f WHERE f.isActive = true")
    List<Favorite> findAllActive(Pageable pageable);

    @Query("FROM Favorite f WHERE f.selectorId = :id AND f.isActive = true")
    List<Favorite> findActiveBySelectorId(@Param("id") Long id, Pageable pageable);

    @Query("FROM Favorite f WHERE f.selectedPostId = :id AND f.isActive = true")
    List<Favorite> findActiveByPostId(@Param("id") Long id, Pageable pageable);

}
