package com.coyjiv.isocial.service.subscriber;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.SubscriberRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Subscriber;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.transfer.user.UserProfileResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ListSubscriberService {
  private final SubscriberRepository subscriberRepository;
  private final UserRepository userRepository;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;
  private final UserProfileResponseDtoMapper userProfileResponseDtoMapper;

  @Transactional(readOnly = true)
  public PageWrapper<UserProfileResponseDto> getSubscribers(int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    List<User> users = new ArrayList<>();
    Page<Subscriber> subscribers = subscriberRepository.getSubscribers(emailPasswordAuthProvider
            .getAuthenticationPrincipal(), pageable);


    for (Subscriber s : subscribers) {
      users.add(userRepository.findById(s.getSubscriberId()).orElseThrow());
    }

    boolean hasNext = subscribers.hasNext();

    List<UserProfileResponseDto> dtos = users.stream().map(userProfileResponseDtoMapper::convertToDto).toList();
    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  public PageWrapper<UserProfileResponseDto> getSubscriptions(int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    List<User> users = new ArrayList<>();
    Page<Subscriber> subscriptions = subscriberRepository.getSubscriptions(emailPasswordAuthProvider
            .getAuthenticationPrincipal(), pageable);

    for (Subscriber s : subscriptions) {
      users.add(userRepository.findById(s.getUserId()).orElseThrow());
    }
    boolean hasNext = subscriptions.hasNext();

    List<UserProfileResponseDto> dtos = users.stream().map(userProfileResponseDtoMapper::convertToDto).toList();

    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  public List<UserProfileResponseDto> getSubscriptions() {
    List<User> users = new ArrayList<>();
    List<Subscriber> subscriptions = subscriberRepository.getSubscriptions(emailPasswordAuthProvider
            .getAuthenticationPrincipal());

    for (Subscriber s : subscriptions) {
      users.add(userRepository.findById(s.getUserId()).orElseThrow());
    }
    return users.stream().map(userProfileResponseDtoMapper::convertToDto).toList();
  }
}
