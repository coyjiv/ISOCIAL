package com.coyjiv.isocial.service.subscriber;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.SubscriberRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Subscriber;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.subscriber.DefaultSubscriberResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.transfer.user.UserProfileResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SubscriberService implements ISubscriberService {
  private final SubscriberRepository subscriberRepository;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;

  @Transactional(readOnly = true)
  @Override
  public DefaultSubscriberResponseDto getSubscribersCount() {
    DefaultSubscriberResponseDto dto = new DefaultSubscriberResponseDto();
    dto.setSubscribersCount(subscriberRepository.getCountSubscribersByUserId(emailPasswordAuthProvider
            .getAuthenticationPrincipal()));
    return dto;
  }

  @Transactional(readOnly = true)
  @Override
  public DefaultSubscriberResponseDto getSubscriptionsCount() {
    DefaultSubscriberResponseDto dto = new DefaultSubscriberResponseDto();
    dto.setSubscribersCount(subscriberRepository.getCountSubscriptionsCountBySubscriberId(emailPasswordAuthProvider
            .getAuthenticationPrincipal()));
    return dto;
  }


  @Transactional
  @Override
  public void deleteSubscriber(Long userId, Long subscriberId) {
    Optional<Subscriber> subscriber = subscriberRepository.findSubscriberByUserIdAndSubscriberId(userId, subscriberId);
    if (subscriber.isPresent()) {
      Subscriber sub = subscriber.get();
      sub.setActive(false);
      subscriberRepository.save(sub);
    }
  }

  @Transactional
  @Override
  public void createSubscriber(Long userId, Long subscriberId) {
    Optional<Subscriber> subscriber = subscriberRepository.findSubscriberByUserIdAndSubscriberId(userId, subscriberId);
    if (subscriber.isEmpty()) {
      subscriberRepository.save(new Subscriber(userId, subscriberId));
    }
  }
}
