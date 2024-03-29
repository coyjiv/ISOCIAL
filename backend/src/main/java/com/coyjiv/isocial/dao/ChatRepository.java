package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

  @Query("FROM Chat c WHERE c.id = :id AND c.isActive = true ")
  Optional<Chat> findActiveById(@Param("id") Long id);

  @Query("FROM Chat c WHERE :sender MEMBER OF c.users AND :receiver MEMBER OF c.users")
  Optional<Chat> findChatBetweenUsers(@Param("sender") User senderId, @Param("receiver") User receiverId);

  @Query("SELECT c.id FROM Chat c JOIN c.users u WHERE u.id IN (:userId, :principalId) AND "
      + "c.isActive = true GROUP BY c.id HAVING COUNT(c.id) = 2")
  Optional<Long> findChatIdByUsersIdAndIsActive(@Param("userId") Long userId, @Param("principalId") Long principalId);
}
