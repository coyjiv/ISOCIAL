package com.coyjiv.isocial.transfer.message;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.dto.respone.user.UserDefaultResponseDto;
import com.coyjiv.isocial.dto.respone.user.UserProfileResponseDto;
import com.coyjiv.isocial.service.user.IUserService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageNotificationDtoMapper extends DtoMapperFacade<Message, MessageNotificationDto> {
  private final UserRepository userRepository;

  public MessageNotificationDtoMapper(UserRepository userRepository) {
    super(Message.class, MessageNotificationDto.class);
    this.userRepository = userRepository;
  }

  @Override
  protected void decorateDto(MessageNotificationDto dto, Message entity) {
    dto.setMessageId(entity.getId());
    User sender = userRepository.findActiveById(entity.getSenderId()).orElseThrow();
    String senderName = sender.getFirstName() + " " + sender.getLastName();
    dto.setSenderName(senderName);
    if (!sender.getAvatarsUrl().isEmpty()) {
      dto.setSenderAvatarUrl(sender.getAvatarsUrl().get(0));
    }
  }
}
