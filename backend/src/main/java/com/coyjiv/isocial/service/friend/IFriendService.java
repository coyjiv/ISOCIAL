package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.UserFriendStatus;
import com.coyjiv.isocial.dto.respone.friend.CustomFriendResponse;
import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.dto.respone.page.PageWrapper;
import com.coyjiv.isocial.dto.respone.user.UserSearchResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import org.springframework.data.repository.query.Param;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IFriendService {
  boolean sendFriendRequest(Long addresserId) throws IOException, EntityNotFoundException, IllegalAccessException;

  boolean acceptFriendRequest(Long friendId) throws IllegalAccessException;

  boolean declineOrCancelFriendRequest(Long friendId) throws IllegalAccessException;

  boolean deleteFriend(Long friendId) throws IllegalAccessException;

  Long getFriendsCount(Long userId);

  PageWrapper<FriendResponseDto> findAllFriends(Long userId, int page, int size);

  Long getSubscribersCount(Long userId);

  CustomFriendResponse availableFriendRequests(Integer page,
                                               Integer size) throws EntityNotFoundException;

  UserFriendStatus getFriendStatus(Long id, Long authenticationPrincipal);

  Long getSubscriptionsCount(Long id);

  List<FriendResponseDto> getFriendsWithUpcomingBirthdays(Long userId, int page, int size);

  PageWrapper<FriendResponseDto> getFriendsWithSameBirthplace(Long userId, int page, int size);

  PageWrapper<FriendResponseDto> getFriendsWithSameEducation(Long userId, int page, int size);

  PageWrapper<FriendResponseDto> getFriendsWithSameLocation(Long userId, int page, int size);

  PageWrapper<FriendResponseDto> getRecommendations(int page, int size);

  PageWrapper<FriendResponseDto> findByName(String name, int page, int size);

  Optional<Friend> findActiveFriendship(Long userId1, Long userId2);
}
