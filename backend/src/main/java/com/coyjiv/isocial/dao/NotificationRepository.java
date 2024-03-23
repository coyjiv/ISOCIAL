package com.coyjiv.isocial.dao;


import com.coyjiv.isocial.domain.Notification;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Date;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

  @Query("FROM Notification n WHERE n.receiverId = :receiverId")
  List<Notification> findAllForUser(@Param("receiverId") Long receiverId, Pageable pageable);

  @Modifying
  @Query("DELETE Notification n WHERE n.senderId = :senderId AND n.entityId = :entityId "
          + " AND n.creationDate BETWEEN :startDate AND :endDate")
  void delete(@Param("senderId") Long senderId, @Param("entityId") Long entityId,
              @Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
