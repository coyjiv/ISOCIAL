package com.coyjiv.isocial.service.subscriber;

import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.subscriber.DefaultSubscriberResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface ISubscriberService {
  DefaultSubscriberResponseDto getSubscribersCount();

  DefaultSubscriberResponseDto getSubscriptionsCount();

  void deleteSubscriber(Long userId, Long subscriberId);

  void createSubscriber(Long userId, Long subscriberId);
}
