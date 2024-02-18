package com.coyjiv.isocial.transfer.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class MessageNotificationDtoMapper extends DtoMapperFacade<Message, MessageNotificationDto> {
  private final IUserService userService;

  public MessageNotificationDtoMapper(IUserService userService) {
    super(Message.class, MessageNotificationDto.class);
    this.userService = userService;
  }

  @Override
  protected void decorateDto(MessageNotificationDto dto, Message entity) {
    dto.setMessageId(entity.getId());
    try {
      UserProfileResponseDto sender = userService.findActiveById(entity.getSenderId());
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
