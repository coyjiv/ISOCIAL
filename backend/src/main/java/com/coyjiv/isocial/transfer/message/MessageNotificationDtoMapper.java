package com.coyjiv.isocial.transfer.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.ChatMessageNotificationDto;
import com.coyjiv.isocial.dto.respone.UserDefaultResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageNotificationDtoMapper extends DtoMapperFacade<Message, ChatMessageNotificationDto> {
  private final IUserService userService;

  public MessageNotificationDtoMapper(IUserService userService) {
    super(Message.class, ChatMessageNotificationDto.class);
    this.userService = userService;
  }

  @Override
  protected void decorateDto(ChatMessageNotificationDto dto, Message entity) {
    dto.setMessageId(entity.getId());
    try {
      UserDefaultResponseDto sender = userService.findActiveById(entity.getSenderId());
      String senderName = sender.getFirstName() + " " + sender.getLastName();
      dto.setSenderName(senderName);
      if (!sender.getAvatarsUrl().isEmpty()) {
        dto.setSenderAvatarUrl(sender.getAvatarsUrl().get(0));
      }
    } catch (Exception exception) {
      exception.printStackTrace();
    }
  }
}
