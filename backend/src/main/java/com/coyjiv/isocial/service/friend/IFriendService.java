package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;

import java.io.IOException;
import java.util.List;

public interface IFriendService {
  boolean sendFriendRequest(Long addresserId) throws IOException, EntityNotFoundException;

  boolean acceptFriendRequest(Long friendId) throws IllegalAccessException;

  boolean declineFriendRequest(Long userId, Long friendId) throws IllegalAccessException;

  boolean deleteFriend(Long friendId) throws IllegalAccessException;

  List<FriendResponseDto> findAllFriends(Long userId, int page, int size);
}
