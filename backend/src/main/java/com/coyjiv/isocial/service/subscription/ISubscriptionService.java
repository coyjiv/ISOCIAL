package com.coyjiv.isocial.service.subscription;

import com.coyjiv.isocial.domain.Subscription;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ISubscriptionService {

  List<Subscription> findAllBySubscriberId(Long subscriberId);


  Optional<Subscription> findByUserIdAndSubscriberId(Long userId, Long subscriberId);


  void subscribe(Long userId, Long subscriberId);

  void unsubscribe(Long userId, Long subscriberId);
}
