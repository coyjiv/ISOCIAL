package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

  @Query("SELECT s FROM Subscription s WHERE s.subscriberId = :id")
  List<Subscription> findAllBySubscriberId(Long id);
  @Query("SELECT s FROM Subscription s WHERE s.subscriberId = :subscriberId AND s.userId = :userId")
  Optional<Subscription> findByUserIdAndSubscriberId(Long userId, Long subscriberId);
}
