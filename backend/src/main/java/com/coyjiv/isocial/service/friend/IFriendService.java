package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.FriendResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IFriendService {
  boolean sendFriendRequest(Long requesterId, Long addresserId);

  boolean acceptFriendRequest(Long userId, Long friendId);

  boolean declineFriendRequest(Long userId, Long friendId);

  boolean deleteFriend(Long userId, Long friendId);

  List<FriendResponseDto> findAllFriends(Long userId, int page, int size);
}
