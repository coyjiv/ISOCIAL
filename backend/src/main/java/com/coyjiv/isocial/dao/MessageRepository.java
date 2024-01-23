package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {

  @Query("from Message m where m.chatId = :chatId")
  List<Message> findAllByChatId(@Param("chatId") Long chatId, Pageable pageable);
}
