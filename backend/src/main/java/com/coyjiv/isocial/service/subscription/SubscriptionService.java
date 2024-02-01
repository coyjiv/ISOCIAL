package com.coyjiv.isocial.service.subscription;

import com.coyjiv.isocial.dao.SubscriptionRepository;
import com.coyjiv.isocial.domain.Subscription;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SubscriptionService implements ISubscriptionService {
  private final SubscriptionRepository subscriptionRepository;

  @Transactional(readOnly = true)
  @Override
  public List<Subscription> findAllBySubscriberId(Long subscriberId) {
    return subscriptionRepository.findAllBySubscriberId(subscriberId);
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<Subscription> findByUserIdAndSubscriberId(Long userId, Long subscriberId) {
    return subscriptionRepository.findByUserIdAndSubscriberId(userId, subscriberId);
  }

  @Transactional
  @Override
  public void subscribe(Long userId, Long subscriberId) {
    Optional<Subscription> subscription = findByUserIdAndSubscriberId(userId, subscriberId);
    if (subscription.isPresent()) {
      subscription.get().setActive(true);
    } else {
      subscriptionRepository.save(new Subscription(userId, subscriberId, true));
    }
  }

  @Transactional
  @Override
  public void unsubscribe(Long userId, Long subscriberId) {
    Optional<Subscription> subscription = findByUserIdAndSubscriberId(userId, subscriberId);
    if (subscription.isPresent()) {
      subscription.get().setActive(false);
    } else {
      subscriptionRepository.save(new Subscription(userId, subscriberId, false));
    }
  }
}
