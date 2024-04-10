package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Message;
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
public interface MessageRepository extends JpaRepository<Message, Long> {

  @Query("FROM Message m WHERE m.chatId = :chatId AND m.isActive = true")
  Page<Message> findAllActiveByChatId(@Param("chatId") Long chatId, Pageable pageable);

  @Query("FROM Message m WHERE m.id = :id AND m.isActive = true")
  Optional<Message> findActiveById(@Param("id") Long id);

  @Query("FROM Message m where m.chatId= :chatId AND m.isActive = true")
  Optional<Message> findLastActiveById(@Param("chatId") Long chatId);

  @Query("SELECT m FROM Message m JOIN Chat c ON m.chatId = c.id JOIN c.users "
    + "u WHERE u.id = :requestOwnerId AND CONCAT('%',LOWER(m.text),'%') LIKE CONCAT('%',LOWER(:searchTerm),'%') ")
  Page<Message> search(@Param("searchTerm") String searchTerm, Pageable pageable, Long requestOwnerId);

  @Query("SELECT count(m) FROM Message m WHERE m.senderId != :userId AND m.status = 'SENT'")
  Long countUnreadMessages(@Param("userId") Long userId);

  @Query("SELECT count(m) FROM Message m WHERE m.senderId != :userId AND m.status = 'SENT' AND m.chatId = :chatId")
  Long countUnreadMessagesForChat(@Param("userId") Long userId,
                                  @Param("chatId") Long chatId);

  @Query("UPDATE Message m SET m.status = 'SEEN' WHERE m.status = 'SENT' AND m.chatId = :chatId "
    + "AND m.senderId != :userId")
  @Modifying
  void readAllMessages(@Param("chatId") Long chatId,
                       @Param("userId") Long userId);

  @Query("UPDATE Message m SET m.status = 'SEEN' WHERE m.id = :messageId AND m.status = 'SENT'"
    + "AND m.senderId != :userId")
  @Modifying
  void readOneMessage(@Param("messageId") Long messageId,
                      @Param("userId") Long userId);

}
