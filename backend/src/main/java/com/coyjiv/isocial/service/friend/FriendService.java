package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.FriendRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.message.IWebsocketMessageService;
import com.coyjiv.isocial.transfer.friend.FriendResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FriendService implements IFriendService {

  private final UserRepository userRepository;
  private final FriendRepository friendRepository;
  private final FriendResponseMapper friendResponseMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;
  private final IWebsocketMessageService websocketService;

  @Transactional
  @Override
  public boolean sendFriendRequest(Long addresserId) throws EntityNotFoundException, IllegalAccessException {
    Long requesterId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    if (requesterId.equals(addresserId)) {
      throw new IllegalAccessException("You cannot sent request yourself");
    }

    Optional<User> requester = userRepository.findById(requesterId);
    Optional<User> addresser = userRepository.findById(addresserId);

    if (!requester.isPresent() || !addresser.isPresent()) {
      throw new EntityNotFoundException("User not found");
    }

    Optional<Friend> existingFriendship =
      friendRepository.findByRequesterAndAddresserAndIsActive(requester.get(), addresser.get(), true);
    if (existingFriendship.isPresent()) {
      return false;
    }

    Optional<Friend> inactiveFriendship =
      friendRepository.findByRequesterAndAddresserAndIsActive(requester.get(), addresser.get(), false);
    if (!inactiveFriendship.isPresent()) {
      inactiveFriendship = friendRepository.findByRequesterAndAddresserAndIsActive(addresser.get(), requester.get(), false);
    }
    if (inactiveFriendship.isPresent()) {
      Friend friend = inactiveFriendship.get();
      friend.setActive(true);
      friend.setRequester(requester.get());
      friend.setAddresser(addresser.get());
      friendRepository.save(friend);
      return true;
    }

    if (friendRepository.existsByRequesterAndAddresserAndIsActive(requester.get(), addresser.get(), true)
      ||
      friendRepository.existsByRequesterAndAddresserAndIsActive(addresser.get(), requester.get(), true)) {
      throw new IllegalAccessException("You need to accept existing request");
    }

    Friend friend = new Friend(requester.get(), addresser.get());
    friendRepository.save(friend);
    websocketService.sendFriendNotificationToUser(friend);
    return true;
  }


  @Transactional
  @Override
  public boolean acceptFriendRequest(Long friendId) throws IllegalAccessException {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);
    Optional<Friend> friend = friendRepository.findById(friendId);

    if (user.isEmpty() || friend.isEmpty() || !user.get().equals(friend.get().getAddresser())) {
      return false;
    }


    if ("PENDING".equals(friend.get().getStatus())) {
      friend.get().accept();
      friendRepository.save(friend.get());
      return true;
    }

    return false;
  }


  @Transactional
  @Override
  public boolean declineFriendRequest(Long friendId) throws IllegalAccessException {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);
    Optional<Friend> friend = friendRepository.findById(friendId);


    if (user.isEmpty() || friend.isEmpty()
      || (!user.get().equals(friend.get().getRequester()) && !user.get().equals(friend.get().getAddresser()))) {
      return false;
    }

    if ("ACCEPTED".equals(friend.get().getStatus())) {
      throw new IllegalAccessException("You cannot decline a friend request that has already been accepted");
    }

    friendRepository.delete(friend.get());
    return true;
  }


  @Transactional
  @Override
  public boolean deleteFriend(Long friendId) throws IllegalAccessException {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);
    Optional<Friend> friend = friendRepository.findById(friendId);


    if (user.isEmpty() || friend.isEmpty() || !"ACCEPTED".equals(friend.get().getStatus())) {
      return false;
    }
    if (user.get().equals(friend.get().getRequester()) || user.get().equals(friend.get().getAddresser())) {
      friend.get().setActive(false);
      friend.get().setStatus("PENDING");
      friendRepository.save(friend.get());
      return true;
    }

    return false;
  }


  @Transactional(readOnly = true)
  @Override
  public List<FriendResponseDto> findAllFriends(Long userId, int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    Optional<User> user = userRepository.findById(userId);


    if (user.isEmpty()) {
      return new ArrayList<>();
    }

    Page<Friend> friendsPage =
      friendRepository.findAllByRequesterOrAddresserAndStatus(user.get(), user.get(), "ACCEPTED", pageable);

    return friendsPage.getContent().stream().filter(friend -> "ACCEPTED".equals(friend.getStatus()))
      .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
      .map(friendResponseMapper::convertToDto).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public Long getFriendsCount(Long userId) {
    return friendRepository.countAllAcceptedFriends(userRepository.findById(userId).orElseThrow());
  }

  @Transactional(readOnly = true)
  @Override
  public Long getSubscribersCount(Long userId) {
    return friendRepository.countAllNonAcceptedFriends(userRepository.findById(userId).orElseThrow());
  }

  @Transactional(readOnly = true)
  @Override
  public boolean haveSentRequest(Long currentUserId, Long userId) {
    return friendRepository.existsByRequesterAndAddresserAndIsActive(userRepository.findById(currentUserId).orElseThrow(),
      userRepository.findById(userId).orElseThrow(), true);
  }

  @Transactional
  @Override
  public boolean cancelFriendRequest(Long friendId) {
    return friendRepository.deletePendingFriendRequestsByUserId(friendId) > 0;
  }

  @Override
  public List<FriendResponseDto> availableFriendRequests(Long userId) {
    Optional<User> userOptional = userRepository.findById(userId);
    if (userOptional.isEmpty()) {
      return Collections.emptyList();
    }
    User user = userOptional.get();

    List<Friend> pendingFriendRequests = friendRepository.findAllByAddresserAndStatus(user, "PENDING");

    return pendingFriendRequests.stream().map(Friend::getRequester).map(friendResponseMapper::convertToDto)
      .collect(Collectors.toList());
  }

  @Override
  public boolean isFriend(Long currentUserId, Long userId) {
    return friendRepository.countFriendship(userRepository.findById(currentUserId).orElseThrow(),
      userRepository.findById(userId).orElseThrow()) > 0;
  }
}

