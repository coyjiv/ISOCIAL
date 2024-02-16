package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;

import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
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
public interface FriendRepository extends JpaRepository<Friend, Long> {
  boolean existsByRequesterAndAddresserAndIsActive(User requester, User addresser, boolean isActive);

  Optional<Friend> findByRequesterAndAddresserAndIsActive(User requester, User addresser, boolean isActive);

  Page<Friend> findAllByRequesterOrAddresserAndStatus(User requester, User addresser, String status, Pageable pageable);

  @Query("SELECT count(f) FROM Friend f WHERE (f.requester = :user OR f.addresser = :user) AND f.status = 'ACCEPTED'")
  Long countAllAcceptedFriends(@Param("user") User user);

  @Query("SELECT count(f) FROM Friend f WHERE (f.requester = :user OR f.addresser = :user) AND f.status != 'ACCEPTED'")
  Long countAllNonAcceptedFriends(@Param("user") User user);

  @Modifying
  @Transactional
  @Query("DELETE FROM Friend f WHERE (f.requester.id = :userId OR f.addresser.id = :userId) AND f.status = 'PENDING'")
  int deletePendingFriendRequestsByUserId(@Param("userId") Long userId);

  List<Friend> findAllByAddresserAndStatus(User addresser, String status);


  @Query("SELECT COUNT(f) FROM Friend f WHERE "
    +
    "((f.requester = :user AND f.addresser = :friend) OR "
    +
    "(f.addresser = :user AND f.requester = :friend)) AND "
    +
    "f.status = 'ACCEPTED'")
  long countFriendship(@Param("user") User user, @Param("friend") User friend);

}

