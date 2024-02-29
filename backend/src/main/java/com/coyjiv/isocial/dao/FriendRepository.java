package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}

