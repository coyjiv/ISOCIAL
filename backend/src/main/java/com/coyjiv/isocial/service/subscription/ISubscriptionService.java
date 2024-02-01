package com.coyjiv.isocial.service.subscription;

import com.coyjiv.isocial.domain.Subscription;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ISubscriptionService {
  @Transactional(readOnly = true)
  List<Subscription> findAllBySubscriberId(Long subscriberId);

  @Transactional(readOnly = true)
  Optional<Subscription> findByUserIdAndSubscriberId(Long userId, Long subscriberId);

  @Transactional
  void updateSubscription(Long userId, Long subscriberId);
}
