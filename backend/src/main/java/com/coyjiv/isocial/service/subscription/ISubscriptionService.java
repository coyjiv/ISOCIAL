package com.coyjiv.isocial.service.subscription;

import com.coyjiv.isocial.domain.Subscription;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ISubscriptionService {

  List<Subscription> findAllBySubscriberId();

  List<Subscription> findAllUserSubscribers(Long userId);

  Optional<Subscription> findByUserIdAndSubscriberId(Long userId, Long subscriberId) throws IllegalAccessException;


  void subscribe(Long userId) throws IllegalAccessException, RequestValidationException;

  void unsubscribe(Long userId) throws IllegalAccessException, EntityNotFoundException;
}
