package com.coyjiv.isocial.service.websocket;

import com.coyjiv.isocial.dao.CommentRepository;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.*;
import com.coyjiv.isocial.dto.respone.comment.CommentNotificationDto;
import com.coyjiv.isocial.dto.respone.friend.FriendNotificationDto;
import com.coyjiv.isocial.dto.respone.like.LikeNotificationDto;
import com.coyjiv.isocial.dto.respone.message.MessageNotificationDto;
import com.coyjiv.isocial.dto.respone.post.PostNotificationDto;
import com.coyjiv.isocial.dto.respone.post.RepostNotificationDto;
import com.coyjiv.isocial.service.subscription.ISubscriptionService;
import com.coyjiv.isocial.transfer.comment.CommentNotificationMapper;
import com.coyjiv.isocial.transfer.friend.FriendNotificationMapper;
import com.coyjiv.isocial.transfer.like.LikeNotificationDtoMapper;
import com.coyjiv.isocial.transfer.message.MessageNotificationDtoMapper;
import com.coyjiv.isocial.transfer.post.PostNotificationMapper;
import com.coyjiv.isocial.transfer.post.RepostNotificationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WebsocketService implements IWebsocketService {

  private final SimpMessagingTemplate messagingTemplate;
  private final MessageNotificationDtoMapper messageNotificationDtoMapper;
  private final FriendNotificationMapper friendMapper;
  private final RepostNotificationMapper repostMapper;
  private final PostNotificationMapper postNotificationMapper;
  private final LikeNotificationDtoMapper likeNotificationMapper;
  private final CommentNotificationMapper commentNotificationMapper;
  private final UserRepository userRepository;
  private final PostRepository postRepository;
  private final CommentRepository commentRepository;
  private final ISubscriptionService subscriptionService;

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
  public void sendFriendNotificationToUser(Friend friend) {
    FriendNotificationDto dto = friendMapper.convertToDto(friend);

    messagingTemplate.convertAndSendToUser(
            String.valueOf(friend.getAddresser().getId()), "/friends", dto
    );
  }

  @Override
  public void sendRepostNotificationToUser(Post repost, Long originalPostAuthorId) {
    RepostNotificationDto dto = repostMapper.convertToDto(repost);

    messagingTemplate.convertAndSendToUser(
            String.valueOf(originalPostAuthorId), "/reposts", dto
    );
  }

  @Override
  public void sendSubscriptionEventNotificationToUser(Post post) {
    List<Subscription> subscriptions = subscriptionService.findAllUserSubscribers(post.getAuthorId());
    PostNotificationDto dto = postNotificationMapper.convertToDto(post);
    subscriptions.forEach(s -> {
      messagingTemplate.convertAndSendToUser(
              String.valueOf(s.getSubscriberId()), "/subscriptions", dto
      );
    });
  }

  @Override
  public void sendLikeNotificationToUser(Like like) {
    LikeNotificationDto dto = likeNotificationMapper.convertToDto(like);
    Long receiverId;
    if (like.getEntityType() == LikeableEntity.POST) {
      Post post = postRepository.findById(like.getEntityId()).orElseThrow();
      receiverId = post.getAuthorId();
    } else {
      Comment comment = commentRepository.findById(like.getEntityId()).orElseThrow();
      receiverId = comment.getCommenterId();
    }

    messagingTemplate.convertAndSendToUser(
            String.valueOf(receiverId), "/likes", dto
    );
  }

  @Override
  public void sendCommentNotification(Comment comment) {
    Post post = postRepository.findById(comment.getPostId()).orElseThrow();
    CommentNotificationDto dto = commentNotificationMapper.convertToDto(comment);
    messagingTemplate.convertAndSendToUser(
            String.valueOf(post.getAuthorId()), "/comments", dto
    );
  }


}
