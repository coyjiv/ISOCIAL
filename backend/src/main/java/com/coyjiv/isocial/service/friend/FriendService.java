package com.coyjiv.isocial.service.friend;

import com.coyjiv.isocial.dao.FriendRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.FriendResponseDto;
import com.coyjiv.isocial.transfer.friend.FriendResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class FriendService implements IFriendService {

  private final UserRepository userRepository;
  private final FriendRepository friendRepository;
  private final FriendResponseMapper friendResponseMapper;

  @Transactional
  @Override
  public boolean sendFriendRequest(Long requesterId, Long addresserId) {
    if (requesterId.equals(addresserId)) {
      return false;
    }

    Optional<User> requester = userRepository.findById(requesterId);
    Optional<User> addresser = userRepository.findById(addresserId);

    if (requester.isEmpty()
            || addresser.isEmpty()
            || friendRepository.existsByRequesterAndAddresser(requester.get(), addresser.get())) {
      return false;
    }

    Friend friend = new Friend(requester.get(), addresser.get());
    friendRepository.save(friend);
    return true;
  }

  @Transactional
  @Override
  public boolean acceptFriendRequest(Long userId, Long friendId) {
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
  public boolean declineFriendRequest(Long userId, Long friendId) {
    Optional<User> user = userRepository.findById(userId);
    Optional<Friend> friend = friendRepository.findById(friendId);

    if (user.isEmpty()
            || friend.isEmpty()
            || (!user.get().equals(friend.get().getRequester()) && !user.get().equals(friend.get().getAddresser()))) {
      return false;
    }

    friend.get().decline();
    friendRepository.save(friend.get());
    return true;
  }



  @Transactional
  @Override
  public boolean deleteFriend(Long userId, Long friendId) {
    Optional<User> user = userRepository.findById(userId);
    Optional<Friend> friend = friendRepository.findById(friendId);

    if (user.isEmpty() || friend.isEmpty() || !"ACCEPTED".equals(friend.get().getStatus())) {
      return false;
    }
    if (user.get().equals(friend.get().getRequester()) || user.get().equals(friend.get().getAddresser())) {
      friendRepository.delete(friend.get());
      return true;
    }

    return false;
  }



  @Transactional(readOnly = true)
  @Override
  public List<FriendResponseDto> findAllFriends(Long userId, int page, int size) {
    Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
    Pageable pageable = PageRequest.of(page - 1, size, sort);
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      return new ArrayList<>();
    }

    Page<Friend> friendsPage = friendRepository.findAllByRequesterOrAddresserAndStatus(user.get(),
            user.get(), "ACCEPTED", pageable);

    return friendsPage.getContent().stream()
            .filter(friend -> "ACCEPTED".equals(friend.getStatus()))
            .map(friend -> user.get().equals(friend.getRequester()) ? friend.getAddresser() : friend.getRequester())
            .map(friendResponseMapper::convertToDto)
            .toList();
  }



}

