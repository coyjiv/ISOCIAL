package com.coyjiv.isocial.transfer.message;

import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.MessageStatus;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class CreateMessageRequestMapper extends DtoMapperFacade<Message, CreateMessageRequestDto> {

  public CreateMessageRequestMapper(){
    super(Message.class, CreateMessageRequestDto.class);
  }

  @Override
  protected void decorateEntity(Message entity, CreateMessageRequestDto dto) {
    entity.setStatus(MessageStatus.SENT);
    entity.setEditted(false);
    entity.setActive(true);
  }
}
