package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.FriendRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.PrivacySetting;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserFriendStatus;
import com.coyjiv.isocial.domain.UserPreference;
import com.coyjiv.isocial.dto.respone.friend.CustomFriendResponse;
import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.chat.IChatService;
import com.coyjiv.isocial.service.subscriber.ISubscriberService;
import com.coyjiv.isocial.service.userpreference.IUserPreferenceService;
import com.coyjiv.isocial.service.websocket.IWebsocketService;
import com.coyjiv.isocial.transfer.friend.FriendResponseMapper;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Objects;


@Service
@RequiredArgsConstructor
public class FriendService implements IFriendService {

  private final UserRepository userRepository;
  private final FriendRepository friendRepository;
  private final FriendResponseMapper friendResponseMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;
  private final IChatService chatService;
  private final ISubscriberService subscriberService;
  private final IUserPreferenceService userPreferenceService;

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
      ||
      friendRequest.get().getStatus() == UserFriendStatus.REQUEST_RECEIVED) {
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

    Optional<Friend> activeFriendship = friendRepository.findFriendshipBetweenUsers(userId, friendUserId);

    if (activeFriendship.isPresent()) {
      Friend friend = activeFriendship.get();
      friend.setActive(false);
      friend.setStatus(UserFriendStatus.NOT_FRIEND);
      friendRepository.save(friend);
      return true;
    }

    return false;
  }


  @Transactional(readOnly = true)
  @Override
  public PageWrapper<FriendResponseDto> findAllFriends(Long userId, int page, int size) {
    UserPreference userPreference = userPreferenceService.getUserPreferences(userId);
    Optional<Friend> optionalFriend = findActiveFriendship(userId, emailPasswordAuthProvider.getAuthenticationPrincipal());
    if (userPreference != null
      && userPreference.getFriendsListVisibility() == PrivacySetting.FRIENDS
      && !userId.equals(emailPasswordAuthProvider.getAuthenticationPrincipal())
      && optionalFriend.isEmpty()) {
      return new PageWrapper<>(new ArrayList<>(), false);
    }

    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      return new PageWrapper<>(new ArrayList<>(), false);
    }

    Page<Friend> friendsPage =
      friendRepository.findAllByRequesterOrAddresserAndStatus(user.get(), user.get(), UserFriendStatus.FRIEND, pageable);

    boolean hasNext = friendsPage.hasNext();

    List<FriendResponseDto> dtos =
      friendsPage.getContent().stream().filter(friend -> friend.getStatus() == UserFriendStatus.FRIEND)
        .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
        .map(friendResponseMapper::convertToDto).toList();

    return new PageWrapper<>(dtos, hasNext);
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
  public CustomFriendResponse availableFriendRequests(Integer page, Integer size) throws EntityNotFoundException {
    long userId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      throw new EntityNotFoundException("User not found");
    }

    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<Friend> friendRequests =
      friendRepository.findByAddresserAndStatusAndIsActive(user.get(), UserFriendStatus.REQUEST_SENT, true, pageable);

    List<FriendResponseDto> content = friendRequests.map(friend -> {
      User requester = friend.getRequester();
      Long chatId = 0L;
      try {
        if (chatService.isUserInvolvedInChat(requester.getId()).isPresent()) {
          chatId = chatService.isUserInvolvedInChat(requester.getId()).get();
        }
      } catch (EntityNotFoundException e) {
        chatId = null;
      }
      return new FriendResponseDto(requester.getId(), requester.getFirstName(), requester.getLastName(),
        requester.getGender(), requester.getCity(), requester.getBirthPlace(), requester.getStudyPlace(),
        requester.getDateOfBirth(), requester.getAvatarsUrl(), requester.getActivityStatus(),
        chatId

      );
    }).getContent();

    boolean hasNext = friendRequests.hasNext();

    return new CustomFriendResponse(content, hasNext);
  }

  @Transactional(readOnly = true)
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

  @Transactional(readOnly = true)
  @Override
  public Long getSubscriptionsCount(Long userId) {
    return friendRepository.countByRequesterAndStatus(userId, UserFriendStatus.REQUEST_SENT);
  }

  @Transactional(readOnly = true)
  @Override
  public List<FriendResponseDto> getFriendsWithUpcomingBirthdays(Long userId, int page, int size) {
    LocalDate today = LocalDate.now();
    LocalDate oneWeekLater = today.plusWeeks(1);

    List<Friend> friends = new ArrayList<>();

    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      return new ArrayList<>();
    }

    if (today.getMonthValue() == oneWeekLater.getMonthValue()) {
      friends = friendRepository.findAllWithBirthdaysWithinAWeek(userId,
        today.getMonthValue(), today.getDayOfMonth(), oneWeekLater.getDayOfMonth());
    } else {
      List<Friend> endOfMonthFriends =
        friendRepository.findAllWithBirthdaysWithinAWeek(userId,
          today.getMonthValue(), today.getDayOfMonth(), today.lengthOfMonth());

      List<Friend> beginningOfNextMonthFriends =
        friendRepository.findAllWithBirthdaysWithinAWeek(userId,
          oneWeekLater.getMonthValue(), 1, oneWeekLater.getDayOfMonth());

      friends.addAll(endOfMonthFriends);
      friends.addAll(beginningOfNextMonthFriends);
    }

    return friends.stream().map(friend -> {
      User user = friend.getRequester().getId().equals(emailPasswordAuthProvider.getAuthenticationPrincipal())
        ? friend.getAddresser() : friend.getRequester();
      return friendResponseMapper.convertToDto(user);
    }).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<FriendResponseDto> getFriendsWithSameBirthplace(Long userId, int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      return new PageWrapper<>(new ArrayList<>(), false);
    }

    Page<Friend> friendsPage =
      friendRepository.findAllWithSameBirthplace(userId, pageable);

    boolean hasNext = friendsPage.hasNext();

    List<FriendResponseDto> dtos =
      friendsPage.getContent().stream().filter(friend -> friend.getStatus() == UserFriendStatus.FRIEND)
        .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
        .map(friendResponseMapper::convertToDto).toList();

    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<FriendResponseDto> getFriendsWithSameEducation(Long userId, int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      return new PageWrapper<>(new ArrayList<>(), false);
    }

    Page<Friend> friendsPage =
      friendRepository.findAllWithSameEducation(userId, pageable);

    boolean hasNext = friendsPage.hasNext();

    List<FriendResponseDto> dtos =
      friendsPage.getContent().stream().filter(friend -> friend.getStatus() == UserFriendStatus.FRIEND)
        .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
        .map(friendResponseMapper::convertToDto).toList();

    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<FriendResponseDto> getFriendsWithSameLocation(Long userId, int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      return new PageWrapper<>(new ArrayList<>(), false);
    }

    Page<Friend> friendsPage =
      friendRepository.findAllWithSameLocation(userId, pageable);

    boolean hasNext = friendsPage.hasNext();

    List<FriendResponseDto> dtos =
      friendsPage.getContent().stream().filter(friend -> friend.getStatus() == UserFriendStatus.FRIEND)
        .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
        .map(friendResponseMapper::convertToDto).toList();

    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<FriendResponseDto> getRecommendations(int page, int size) {
    final Long main = emailPasswordAuthProvider.getAuthenticationPrincipal();
    List<Friend> friends = friendRepository.findAllByUserId(main);
    friends.addAll(friendRepository.findAllByUserIdAndStatusRequestSent(main));
    List<Long> ids = new ArrayList<>();

    for (Friend f : friends) {
      if (Objects.equals(f.getAddresser().getId(), main)) {
        ids.add(f.getRequester().getId());
      } else if (Objects.equals(f.getRequester().getId(), main)) {
        ids.add(f.getAddresser().getId());
      }
    }
    List<Long> friendsIds = ids;
    ids.add(main);

    Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate").and(Sort.by(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<Friend> recommended =
      friendRepository.findAllByFriendIdAndCity(friendsIds, ids, userRepository.findById(main).get().getCity(), pageable);

    List<User> users = new ArrayList<>();
    for (Friend f : recommended.toList()) {
      if (ids.contains(f.getAddresser().getId())) {
        users.add(f.getRequester());
      } else {
        users.add(f.getAddresser());
      }
    }
    boolean hasNext = recommended.hasNext();

    Page<Friend> recommendedNoCity;
    if (recommended.toList().size() < size) {
      pageable = PageRequest.of(page, size - recommended.toList().size(), sort);
      recommendedNoCity = friendRepository.findAllByFriendId(friendsIds, ids, pageable);

      hasNext = recommendedNoCity.hasNext();

      for (Friend f : recommendedNoCity.toList()) {
        if (ids.contains(f.getAddresser().getId())) {
          if (!users.contains(f.getRequester())) {
            users.add(f.getRequester());
          }
        } else {
          if (!users.contains(f.getAddresser())) {
            users.add(f.getAddresser());
          }
        }
      }
    }

    List<FriendResponseDto> dtos = users.stream().map(friendResponseMapper::convertToDto).toList();


    return new PageWrapper<>(dtos, hasNext);
  }

  @Transactional(readOnly = true)
  @Override
  public PageWrapper<FriendResponseDto> findByName(String name, int page, int size) {
    Long currentUserId = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Set<Friend> result = new HashSet<>();
    String[] splittedNames = name.trim().split(" ");

    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page, size, sort);

    boolean hasNext = false;
    if (splittedNames.length > 1) {
      Page<Friend> friends = friendRepository.findByFirstNameOrLastName(splittedNames[0], currentUserId, pageable);
      result.addAll(friends.toList());
      if (friends.hasNext()) {
        hasNext = friends.hasNext();
      }

      friends = friendRepository.findByFirstNameOrLastName(splittedNames[1], currentUserId, pageable);
      if (friends.hasNext()) {
        hasNext = friends.hasNext();
      }
      result.addAll(friends.toList());
    } else {
      Page<Friend> friends = friendRepository.findByFirstNameOrLastName(splittedNames[0], currentUserId, pageable);
      hasNext = friends.hasNext();
      result.addAll(friends.toList());
    }

    List<FriendResponseDto> dtos = result.stream()
      .filter(friend -> friend.getStatus() == UserFriendStatus.FRIEND)
      .map(friend -> friend.getRequester().getId().equals(currentUserId)
        ? userRepository.findActiveById(friend.getAddresser().getId())
        : userRepository.findActiveById(friend.getRequester().getId()))
      .map(user -> user.map(friendResponseMapper::convertToDto).orElse(null))
      .filter(Objects::nonNull)
      .toList();

    return new PageWrapper<>(dtos, hasNext);
  }

  @Override
  public Optional<Friend> findActiveFriendship(Long userId1, Long userId2) {
    return friendRepository.findActiveFriendship(userId1, userId2);
  }
}

