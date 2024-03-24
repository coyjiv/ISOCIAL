package com.coyjiv.isocial.dao;


import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.PostSeen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostSeenRepository extends JpaRepository<PostSeen, Long> {

  @Query("FROM PostSeen ps WHERE ps.userId = :idu AND ps.postId = :idp")
  Optional<PostSeen> findByUserIdPostId(@Param("idu") Long idUser, @Param("idp") Long idPost);


}
