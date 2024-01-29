package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
  boolean existsByRequesterAndAddresser(User requester, User addresser);

  Page<Friend> findAllByRequesterOrAddresserAndStatus(User requester, User addresser, String status, Pageable pageable);


}

