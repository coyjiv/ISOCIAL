package com.coyjiv.isocial.transfer.friend;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.User;

import com.coyjiv.isocial.dto.respone.friend.FriendNotificationDto;
import com.coyjiv.isocial.dto.respone.friend.FriendResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.chat.IChatService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class FriendResponseMapper extends DtoMapperFacade<User, FriendResponseDto> {
  public FriendResponseMapper(IChatService chatService) {
    super(User.class, FriendResponseDto.class);
    this.chatService = chatService;
  }

  private final IChatService chatService;

  @Override
  protected void decorateDto(FriendResponseDto dto, User entity) {
    try {
      Long chatId;
      if (chatService.isUserInvolvedInChat(entity.getId()).isPresent()) {
        chatId = chatService.isUserInvolvedInChat(entity.getId()).get();
      } else {
        chatId = null;
      }
      dto.setChatId(chatId);
    } catch (EntityNotFoundException e) {
      e.printStackTrace();
      dto.setChatId(null);
    }
  }

}
