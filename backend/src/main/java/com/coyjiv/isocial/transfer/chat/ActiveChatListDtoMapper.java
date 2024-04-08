package com.coyjiv.isocial.transfer.chat;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.MessageRepository;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.chat.ActiveChatListDto;
import com.coyjiv.isocial.service.message.IMessageService;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class ActiveChatListDtoMapper extends DtoMapperFacade<Chat, ActiveChatListDto> {
  private final EmailPasswordAuthProvider authProvider;
  private final MessageRepository messageRepository;

  public ActiveChatListDtoMapper(EmailPasswordAuthProvider authProvider,MessageRepository messageRepository) {
    super(Chat.class, ActiveChatListDto.class);
    this.authProvider = authProvider;
    this.messageRepository = messageRepository;
  }

  @Override
  protected void decorateDto(ActiveChatListDto dto, Chat entity) {
    Long senderId = authProvider.getAuthenticationPrincipal();
    User receiver = entity.getUsers().stream().filter(u -> !u.getId().equals(senderId)).toList().get(0);
    dto.setChatName(receiver.getFullName());
    dto.setAvatarUrl(receiver.getAvatar());
    dto.setReceiverStatus(receiver.getActivityStatus());
    dto.setReceiverId(receiver.getId());
    dto.setUnreadMessages(messageRepository.countUnreadMessagesForChat(senderId,entity.getId()));
  }
}
