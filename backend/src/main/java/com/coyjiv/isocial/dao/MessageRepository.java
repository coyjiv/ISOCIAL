package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {

  @Query("FROM Message m WHERE m.chatId = :chatId AND m.isActive = true")
  Page<Message> findAllActiveByChatId(@Param("chatId") Long chatId, Pageable pageable);

  @Query("FROM Message m WHERE m.id = :id AND m.isActive = true")
  Optional<Message> findActiveById(@Param("id") Long id);

  @Query("FROM Message m where m.chatId= :chatId AND m.isActive = true")
  Optional<Message> findLastActiveById(@Param("chatId") Long chatId);
}
