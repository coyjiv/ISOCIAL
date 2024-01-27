package com.coyjiv.isocial.transfer.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.dto.respone.ChatMessageNotificationDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageNotificationDtoMapper extends DtoMapperFacade<Message, ChatMessageNotificationDto> {
  public ChatMessageNotificationDtoMapper(){
    super(Message.class, ChatMessageNotificationDto.class);
  }

  @Override
  protected void decorateDto(ChatMessageNotificationDto dto, Message entity) {
    dto.setMessageId(entity.getId());
  }
}
