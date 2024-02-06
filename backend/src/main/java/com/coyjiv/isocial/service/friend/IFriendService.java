package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;

import java.io.IOException;
import java.util.List;

public interface IFriendService {
  boolean sendFriendRequest(Long addresserId) throws IOException;

  boolean acceptFriendRequest(Long friendId) throws IllegalAccessException;

  boolean declineFriendRequest(Long userId, Long friendId) throws IllegalAccessException;

  boolean deleteFriend(Long userId, Long friendId) throws IllegalAccessException;

  List<FriendResponseDto> findAllFriends(Long userId, int page, int size);
}
