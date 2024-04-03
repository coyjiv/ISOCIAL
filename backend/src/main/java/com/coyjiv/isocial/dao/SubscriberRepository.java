package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Subscriber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
  @Query("SELECT COUNT(s) FROM Subscriber s WHERE s.userId = :userId AND s.isActive = true")
  Long getCountSubscribersByUserId(@Param("userId")Long userId);

  @Query("SELECT COUNT(s) FROM Subscriber s WHERE s.subscriberId = :subscriberId AND s.isActive = true")
  Long getCountSubscriptionsCountBySubscriberId(@Param("subscriberId")Long subscriberId);

  @Query("SELECT s FROM Subscriber s WHERE s.userId = :id AND s.subscriberId = :subscriberId  AND s.isActive = true")
  Optional<Subscriber> findSubscriberByUserIdAndSubscriberId(@Param("id")Long userid,
                                                             @Param("subscriberId") Long subscriberId);

  @Query("SELECT s FROM Subscriber s WHERE s.userId = :userId AND s.isActive = true")
  Page<Subscriber> getSubscribers(@Param("userId")Long userId, Pageable pageable);

  @Query("SELECT s FROM Subscriber s WHERE s.subscriberId = :subscriberId AND s.isActive = true")
  Page<Subscriber> getSubscriptions(@Param("subscriberId")Long subscriberId, Pageable pageable);

  @Query("SELECT s FROM Subscriber s WHERE s.subscriberId = :subscriberId AND s.isActive = true")
  List<Subscriber> getSubscriptions(@Param("subscriberId")Long subscriberId);

}
