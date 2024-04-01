package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("SELECT u FROM User u WHERE u.isActive = true")
  List<User> findAllActive(Pageable pageable);

  @Query("FROM User u WHERE u.email = :email")
  Optional<User> findByEmail(@Param("email") String email);

  @Query("FROM User u WHERE u.email = :email AND u.isActive = true")
  Optional<User> findActiveByEmail(@Param("email") String email);

  @Query("FROM User u WHERE u.id = :id AND u.isActive = true")
  Optional<User> findActiveById(@Param("id") Long id);

  boolean existsUserByEmail(String email);

  @Query("SELECT u.chats FROM User u WHERE u.id = :id AND u.isActive = true")
  Page<Chat> findAllActiveChats(@Param("id") Long userId, Pageable pageable);

  @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR "
          + "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
  Page<User> findByFirstNameOrLastName(@Param("searchTerm") String searchTerm, Pageable pageable);

  @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email AND u.isActive = true")
    boolean existsActiveUserByEmail(String email);
}
