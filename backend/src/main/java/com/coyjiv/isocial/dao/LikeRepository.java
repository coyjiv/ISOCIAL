package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Like;
import com.coyjiv.isocial.domain.LikeableEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

  Optional<Like> findByUserIdAndEntityIdAndEntityType(Long userId, Long entityId, LikeableEntity entityType);

  int countByEntityIdAndEntityType(Long entityId, LikeableEntity entityType);

  Page<Like> findByEntityIdAndEntityType(Long entityId, LikeableEntity entityType, Pageable pageable);

  @Query("FROM Like l WHERE l.entityId = :entityId AND l.entityType = :entityType")
  List<Like> findByEntityIdAndEntityTypeNonPageable(@Param("entityId") Long entityId,
                                                    @Param("entityType") LikeableEntity entityType);
  List<Like> findByUserId(Long userId);

  boolean existsByUserIdAndEntityIdAndEntityType(Long userId, Long entityId, LikeableEntity entityType);

  @Modifying
  @Query("delete from Like l where l.userId = :userId and l.entityId = :entityId and l.entityType = :entityType")
  void deleteByUserIdAndEntityIdAndEntityType(@Param("userId") Long userId,
                                              @Param("entityId") Long entityId,
                                              @Param("entityType") LikeableEntity entityType);

  @Query("select l from Like l where l.entityId = :entityId and l.entityType = :entityType order by l.creationDate desc")
  List<Like> getRecentLikes(@Param("entityId") Long entityId, @Param("entityType") LikeableEntity entityType,
                            Pageable pageable);
}
