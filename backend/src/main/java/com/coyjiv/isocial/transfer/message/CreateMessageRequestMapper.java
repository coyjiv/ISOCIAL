package com.coyjiv.isocial.transfer.message;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.MessageStatus;
import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreateMessageRequestMapper extends DtoMapperFacade<Message, CreateMessageRequestDto> {

  private final EmailPasswordAuthProvider authProvider;

  public CreateMessageRequestMapper(EmailPasswordAuthProvider authProvider) {
    super(Message.class, CreateMessageRequestDto.class);
    this.authProvider = authProvider;
  }

  @Override
  protected void decorateEntity(Message entity, CreateMessageRequestDto dto) {
    entity.setStatus(MessageStatus.SENT);
    entity.setEdited(false);
    entity.setActive(true);
    entity.setSenderId(authProvider.getAuthenticationPrincipal());
    if (dto.getAttachments() == null) {
      entity.setAttachments(List.of());
    }
    if (dto.getText() == null) {
      entity.setText("");
    }
  }
}
