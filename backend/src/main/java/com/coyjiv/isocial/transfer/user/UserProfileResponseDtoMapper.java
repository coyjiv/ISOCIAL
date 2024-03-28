package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.service.friend.IFriendService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class UserProfileResponseDtoMapper extends DtoMapperFacade<User, UserProfileResponseDto> {

  private final IFriendService friendService;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;


  public UserProfileResponseDtoMapper(IFriendService friendService, EmailPasswordAuthProvider emailPasswordAuthProvider) {
    super(User.class, UserProfileResponseDto.class);
    this.friendService = friendService;
    this.emailPasswordAuthProvider = emailPasswordAuthProvider;
  }

  @Override
  protected void decorateDto(UserProfileResponseDto dto, User entity) {
    dto.setFriendsCount(friendService.getFriendsCount(entity.getId()));
    dto.setFriendStatus(
      friendService.getFriendStatus(entity.getId(), emailPasswordAuthProvider.getAuthenticationPrincipal()));
    dto.setSubscriptionsCount(friendService.getSubscriptionsCount(entity.getId()));
    dto.setSubscribersCount(friendService.getSubscribersCount(entity.getId()));
  }
}
