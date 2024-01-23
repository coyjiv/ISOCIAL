package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("from User u where u.email = :email")
  Optional<User> findByEmail(@Param("email") String email);

  boolean existsUserByEmail(String email);

  @Query("select u.chats from User u where u.id = :id")
  List<Chat> findAllChats(@Param("id") Long userId, Pageable pageable);
}
