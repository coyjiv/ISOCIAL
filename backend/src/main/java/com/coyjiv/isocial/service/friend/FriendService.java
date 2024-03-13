package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.FriendRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserFriendStatus;
import com.coyjiv.isocial.dto.respone.friend.CustomFriendResponse;
import com.coyjiv.isocial.dto.respone.friend.CustomFriendResponse;
import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.subscriber.ISubscriberService;
import com.coyjiv.isocial.service.websocket.IWebsocketService;
import com.coyjiv.isocial.transfer.friend.FriendResponseMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FriendService implements IFriendService {

  private final UserRepository userRepository;
  private final FriendRepository friendRepository;
  private final FriendResponseMapper friendResponseMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;

  private final ISubscriberService subscriberService;

  private final IWebsocketService websocketService;

  @Transactional
  @Override
  public boolean sendFriendRequest(Long addresserId) throws EntityNotFoundException, IllegalAccessException {
    Long requesterId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    if (requesterId.equals(addresserId)) {
      throw new IllegalAccessException("You cannot sent request yourself");
    }

    Optional<User> requester = userRepository.findById(requesterId);
    Optional<User> addresser = userRepository.findById(addresserId);

    if (requester.isEmpty() || addresser.isEmpty()) {
      throw new EntityNotFoundException("User not found");
    }

    Optional<Friend> existingFriendship =
      friendRepository.findByRequesterAndAddresserAndIsActive(requester.get(), addresser.get(), true);
    if (existingFriendship.isPresent()) {
      return false;
    }

    Optional<Friend> inactiveFriendship =
      friendRepository.findByRequesterAndAddresserAndIsActive(requester.get(), addresser.get(), false);
    if (inactiveFriendship.isEmpty()) {
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

    subscriberService.createSubscriber(addresserId, requesterId);

    websocketService.sendFriendNotificationToUser(friend);

    return true;
  }


  @Transactional
  @Override
  public boolean acceptFriendRequest(Long friendUserId) {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);
    Optional<User> friend = userRepository.findById(friendUserId);

    Optional<Friend> friendRequest = friendRepository.findFriendshipBetweenUsers(userId, friendUserId);

    if (user.isEmpty() || friend.isEmpty() || user.get().equals(friend.get()) || friendRequest.isEmpty()) {
      return false;
    }

    System.out.println(friendRequest.get().getStatus());


    if (friendRequest.get().getStatus() == UserFriendStatus.REQUEST_SENT
      || friendRequest.get().getStatus() == UserFriendStatus.REQUEST_RECEIVED) {
      friendRequest.get().setStatus(UserFriendStatus.FRIEND);
      friendRepository.save(friendRequest.get());

      subscriberService.deleteSubscriber(userId, friendUserId);

      return true;
    }

    return false;
  }


  @Transactional
  @Override
  public boolean declineOrCancelFriendRequest(Long friendId) throws IllegalAccessException {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();

    Optional<Friend> friendRequest = friendRepository.findFriendshipBetweenUsers(userId, friendId);

    if (friendRequest.isEmpty()) {
      return false;
    }

    Friend friend = friendRequest.get();


    boolean isUserInvolved = userId.equals(friend.getRequester().getId()) || userId.equals(friend.getAddresser().getId());
    if (!isUserInvolved) {
      return false; // The current user is not part of this friend request.
    }

    // Check if the friend request has already been accepted.
    if (friend.getStatus() == UserFriendStatus.FRIEND) {
      throw new IllegalAccessException("You cannot decline or cancel a friend request that has already been accepted.");
    }

    // Proceed to delete the friend request.
    friendRepository.delete(friend);
    return true;
  }


  @Transactional
  @Override
  public boolean deleteFriend(Long friendUserId) {
    Long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);
    Optional<User> friendUser = userRepository.findById(friendUserId);

    if (user.isEmpty() || friendUser.isEmpty()) {
      return false;
    }

    Optional<Friend> activeFriendship =
						friendRepository.findByRequesterAndAddresserAndStatusAndIsActive(user.get(),
						friendUser.get(), UserFriendStatus.FRIEND, true);
    Optional<Friend> activeFriendship1 = 
						friendRepository.findByRequesterAndAddresserAndStatusAndIsActive(friendUser.get(),
						user.get(), UserFriendStatus.FRIEND,true);
    if (activeFriendship.isPresent()) {
      Friend friend = activeFriendship.get();
      friend.setActive(false);
      friend.setStatus(UserFriendStatus.NOT_FRIEND);
      friendRepository.save(friend);
      return true;
    }
    if (activeFriendship1.isPresent()) {
      Friend friend = activeFriendship1.get();
      friend.setActive(false);
      friend.setStatus(UserFriendStatus.NOT_FRIEND);
      friendRepository.save(friend);
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

    Page<Friend> friendsPage = friendRepository.findAllByRequesterOrAddresserAndStatus(
      user.get(), user.get(), UserFriendStatus.FRIEND, pageable);

    return friendsPage.getContent().stream()
      .filter(friend -> friend.getStatus() == UserFriendStatus.FRIEND)
      .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
      .map(friendResponseMapper::convertToDto).collect(Collectors.toList());
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

  @Transactional
  public CustomFriendResponse availableFriendRequests(Integer page, Integer size) throws EntityNotFoundException {
    long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);

    if (!user.isPresent()) {
      throw new EntityNotFoundException("User not found");
    }

    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<Friend> friendRequests = friendRepository.findByAddresserAndStatusAndIsActive(user.get(),
            UserFriendStatus.REQUEST_SENT, true, pageable);

    List<FriendResponseDto> content = friendRequests.map(friend -> {
      User requester = friend.getRequester();
      return new FriendResponseDto(
              requester.getId(),
              requester.getFirstName(),
              requester.getLastName(),
              requester.getAvatarsUrl()
      );
    }).getContent();

    boolean hasNext = friendRequests.hasNext();

    return new CustomFriendResponse(content, hasNext);
  }






  public UserFriendStatus getFriendStatus(Long currentUserId, Long otherUserId) {
    Optional<Friend> friendship = friendRepository.findFriendshipBetweenUsers(currentUserId, otherUserId);
    return friendship.map(friend -> {
      if (friend.getStatus() == UserFriendStatus.FRIEND) {
        return UserFriendStatus.FRIEND;
      } else if (friend.getRequester().getId().equals(currentUserId)) {
        return UserFriendStatus.REQUEST_SENT;
      } else {
        return UserFriendStatus.REQUEST_RECEIVED;
      }
    }).orElse(UserFriendStatus.NOT_FRIEND);
  }

  @Override
  public Long getSubscriptionsCount(Long userId) {
    return friendRepository.countByRequesterAndStatus(userId, UserFriendStatus.REQUEST_SENT);
  }


}

