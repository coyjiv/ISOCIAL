package com.coyjiv.isocial.transfer.friend;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.dto.respone.friend.FriendNotificationDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class FriendNotificationMapper extends DtoMapperFacade<Friend, FriendNotificationDto> {
  public FriendNotificationMapper() {
    super(Friend.class, FriendNotificationDto.class);
  }

  @Override
  protected void decorateDto(FriendNotificationDto dto, Friend entity) {
    dto.setFriendId(entity.getId());
    dto.setSenderAvatarUrl(entity.getRequester().getAvatarsUrl().get(0));
    dto.setSenderId(entity.getRequester().getId());
    dto.setSenderName(entity.getRequester().getFirstName() + entity.getRequester().getLastName());
  }
}
