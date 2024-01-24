package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Chat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository  extends JpaRepository<Chat,Long> {

  @Query("FROM Chat c WHERE c.id = :id AND c.isActive = true ")
  Optional<Chat> findActiveById(@Param("id") Long id);

  @Query("SELECT c FROM Chat c JOIN c.users u WHERE u.id IN :userIds AND SIZE(c.users) = 2")
  Optional<Chat> findChatBetweenUsers(@Param("userIds") List<Long> userIds);
}
