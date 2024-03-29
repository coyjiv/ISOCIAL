package com.coyjiv.isocial.transfer.chat;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.chat.ActiveChatDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class ActiveChatDtoMapper extends DtoMapperFacade<Chat, ActiveChatDto> {
  private final EmailPasswordAuthProvider authProvider;

  public ActiveChatDtoMapper(EmailPasswordAuthProvider authProvider) {
    super(Chat.class, ActiveChatDto.class);
    this.authProvider = authProvider;
  }

  @Override
  protected void decorateDto(ActiveChatDto dto, Chat entity) {
    Long senderId = authProvider.getAuthenticationPrincipal();
    User receiver = entity.getUsers().stream().filter(u -> !u.getId().equals(senderId)).toList().get(0);
    dto.setChatName(receiver.getFullName());
    dto.setAvatarUrl(receiver.getAvatar());
    dto.setReceiverStatus(receiver.getActivityStatus());
    dto.setReceiverLastSeen(receiver.getLastSeen());
    dto.setReceiverId(receiver.getId());
  }
}
