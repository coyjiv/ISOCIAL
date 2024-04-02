package com.coyjiv.isocial.transfer.user;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.SubscriberRepository;
import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.PrivacySetting;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserPreference;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.service.friend.IFriendService;
import com.coyjiv.isocial.service.userpreference.IUserPreferenceService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileResponseDtoMapper extends DtoMapperFacade<User, UserProfileResponseDto> {

  private final IFriendService friendService;
  private final SubscriberRepository subscriberRepository;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;
  private final IUserPreferenceService userPreferenceService;


  public UserProfileResponseDtoMapper(IFriendService friendService, SubscriberRepository subscriberRepository,
                                      EmailPasswordAuthProvider emailPasswordAuthProvider,
                                      IUserPreferenceService userPreferenceService) {
    super(User.class, UserProfileResponseDto.class);
    this.friendService = friendService;
    this.subscriberRepository = subscriberRepository;
    this.emailPasswordAuthProvider = emailPasswordAuthProvider;
    this.userPreferenceService = userPreferenceService;
  }

  @Override
  protected void decorateDto(UserProfileResponseDto dto, User entity) {
    UserPreference optionalUserPreference = userPreferenceService.getUserPreferences(entity.getId());
    Optional<Friend> optionalFriend =
      friendService.findActiveFriendship(entity.getId(), emailPasswordAuthProvider.getAuthenticationPrincipal());
    boolean isCurrentUser = emailPasswordAuthProvider.getAuthenticationPrincipal().equals(entity.getId());
    boolean hasUserPreference = optionalUserPreference != null;
    boolean isAgeVisibilityFriendsOnly =
      hasUserPreference && optionalUserPreference.getAgeVisibility().equals(PrivacySetting.FRIENDS);
    boolean isNotFriend = optionalFriend.isEmpty();

    if (!isCurrentUser && isAgeVisibilityFriendsOnly && isNotFriend) {
      dto.setDateOfBirth(null);
    } else {
      dto.setDateOfBirth(entity.getDateOfBirth());
    }
    dto.setFriendsCount(friendService.getFriendsCount(entity.getId()));
    dto.setFriendStatus(
      friendService.getFriendStatus(entity.getId(), emailPasswordAuthProvider.getAuthenticationPrincipal()));
    dto.setSubscriptionsCount(subscriberRepository
      .getCountSubscriptionsCountBySubscriberId(emailPasswordAuthProvider.getAuthenticationPrincipal()));
    dto.setSubscribersCount(subscriberRepository
      .getCountSubscribersByUserId(emailPasswordAuthProvider.getAuthenticationPrincipal()));
    dto.setDateOfBirth(entity.getDateOfBirth());
  }
}
