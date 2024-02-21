package com.coyjiv.isocial.service.message;

import com.coyjiv.isocial.domain.Friend;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.respone.friend.FriendNotificationDto;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.dto.respone.post.RepostNotificationDto;
import com.coyjiv.isocial.transfer.friend.FriendNotificationMapper;
import com.coyjiv.isocial.transfer.message.MessageNotificationDtoMapper;
import com.coyjiv.isocial.transfer.post.RepostNotificationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WebsocketMessageService implements IWebsocketMessageService {

  private final SimpMessagingTemplate messagingTemplate;
  private final MessageNotificationDtoMapper messageNotificationDtoMapper;
  private final FriendNotificationMapper friendMapper;
  private final RepostNotificationMapper repostMapper;

  @Override
  @Transactional
  public void sendMessageNotificationToUsers(List<User> users, Message message) {
    MessageNotificationDto messageNotificationDto = messageNotificationDtoMapper.convertToDto(message);

    users.forEach((user -> {
      if (!Objects.equals(user.getId(), message.getSenderId())) {
        messagingTemplate.convertAndSendToUser(
                String.valueOf(user.getId()), "/messages", messageNotificationDto
        );
      }
    }));
  }

  @Override
  public void sendLikeNotificationToUser() {

  }

  @Override
  public void sendFriendNotificationToUser(Friend friend) {
    FriendNotificationDto dto = friendMapper.convertToDto(friend);

    messagingTemplate.convertAndSendToUser(
            String.valueOf(friend.getAddresser()), "/friends", dto
    );
  }

  @Override
  public void sendRepostNotificationToUser(Post post) {
    RepostNotificationDto dto = repostMapper.convertToDto(post);

    messagingTemplate.convertAndSendToUser(
            String.valueOf(post.getAuthorId()), "/reposts", dto
    );
  }
}
