package com.coyjiv.isocial.service.subscription;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.SubscriptionRepository;
import com.coyjiv.isocial.domain.Subscription;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SubscriptionService implements ISubscriptionService {
  private final SubscriptionRepository subscriptionRepository;
  private final EmailPasswordAuthProvider authProvider;

  @Transactional(readOnly = true)
  @Override
  public List<Subscription> findAllBySubscriberId() {
    Long subscriberId = authProvider.getAuthenticationPrincipal();
    return subscriptionRepository.findAllBySubscriberId(subscriberId);
  }

  @Override
  public List<Subscription> findAllUserSubscribers(Long userId) {
    return subscriptionRepository.findAllUserSubscribers(userId);
  }

  @Transactional(readOnly = true)
  @Override
  public Optional<Subscription> findByUserIdAndSubscriberId(Long userId, Long subscriberId)
          throws IllegalAccessException {
    Long requestOwner = authProvider.getAuthenticationPrincipal();
    if (!requestOwner.equals(userId) && !requestOwner.equals(subscriberId)) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }
    return subscriptionRepository.findByUserIdAndSubscriberId(userId, subscriberId);
  }

  @Transactional
  @Override
  public void subscribe(Long userId) throws IllegalAccessException, RequestValidationException {
    Long subscriberId = authProvider.getAuthenticationPrincipal();
    if (subscriberId.equals(userId)) {
      throw new RequestValidationException("User can't subscribe his self");
    }
    Optional<Subscription> subscription = findByUserIdAndSubscriberId(userId, subscriberId);
    if (subscription.isPresent()) {
      subscription.get().setActive(true);
    } else {
      subscriptionRepository.save(new Subscription(userId, subscriberId, true));
    }
  }

  @Transactional
  @Override
  public void unsubscribe(Long userId)
          throws IllegalAccessException, EntityNotFoundException {
    Long subscriberId = authProvider.getAuthenticationPrincipal();
    Subscription subscription = findByUserIdAndSubscriberId(userId, subscriberId)
            .orElseThrow(() -> new EntityNotFoundException("Subscription with this id not found"));

    if (subscription.isActive()) {
      subscription.setActive(false);
      subscriptionRepository.save(subscription);
    }
  }
}
