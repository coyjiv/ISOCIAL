package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;

import com.coyjiv.isocial.domain.UserFriendStatus;
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

  Page<Friend> findAllByRequesterOrAddresserAndStatus(User requester, User addresser, UserFriendStatus status,
                                                      Pageable pageable);

  @Query("SELECT count(f) FROM Friend f WHERE (f.requester = :user OR f.addresser = :user) AND f.status = 'ACCEPTED'")
  Long countAllAcceptedFriends(@Param("user") User user);

  @Query("SELECT count(f) FROM Friend f WHERE (f.requester = :user OR f.addresser = :user) AND f.status != 'ACCEPTED'")
  Long countAllNonAcceptedFriends(@Param("user") User user);

  @Modifying
  @Transactional
  @Query("DELETE FROM Friend f WHERE (f.requester.id = :userId OR f.addresser.id = :userId) AND f.status = 'PENDING'")
  int deletePendingFriendRequestsByUserId(@Param("userId") Long userId);

  List<Friend> findAllByAddresserAndStatus(User addresser, UserFriendStatus status);


  @Query("SELECT f FROM Friend f WHERE "
          + "(f.requester.id = :userId1 AND f.addresser.id = :userId2) OR "
          + "(f.requester.id = :userId2 AND f.addresser.id = :userId1)")
  Optional<Friend> findFriendshipBetweenUsers(@Param("userId1") Long userId1, @Param("userId2") Long userId2);

  @Query("SELECT COUNT(f) FROM Friend f WHERE f.requester.id = :userId AND f.status = :status")
  Long countByRequesterAndStatus(@Param("userId") Long userId, @Param("status") UserFriendStatus status);

  Page<Friend> findByAddresserAndStatusAndIsActive(User addresser, UserFriendStatus status,
                                                   boolean isActive, Pageable pageable);

  List<Friend> findAllByRequesterIdOrAddresserIdAndStatus(Long requesterId, Long addresserId, UserFriendStatus status);

  @Query("FROM Friend f WHERE f.requester.id = :id AND f.status = 'FRIEND' "
          + "OR f.addresser.id = :id AND f.status = 'FRIEND'")
  List<Friend> findAllByUserId(@Param("id") Long id);

  @Query("FROM Friend f WHERE f.requester.id IN :friends AND f.addresser.id NOT IN :arr AND f.status = 'FRIEND' "
          + "AND f.addresser.city = :city OR  f.requester.id  NOT IN :arr AND f.addresser.id IN :friends "
          + "AND f.status = 'FRIEND' AND f.requester.city = :city")
  Page<Friend> findAllByFriendIdAndCity(@Param("friends") List<Long> friends, @Param("arr") List<Long> arr,
                                        @Param("city") String city, Pageable pageable);

  @Query("FROM Friend f WHERE f.requester.id IN :friends AND f.addresser.id NOT IN :arr AND f.status = 'FRIEND' "
          + "OR  f.requester.id  NOT IN :arr AND f.addresser.id IN :friends AND f.status = 'FRIEND'")
  Page<Friend> findAllByFriendId(@Param("friends") List<Long> friends, @Param("arr") List<Long> arr, Pageable pageable);
}

