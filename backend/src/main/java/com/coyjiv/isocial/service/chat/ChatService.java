package com.coyjiv.isocial.service.chat;

import com.coyjiv.isocial.dao.ChatRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Chat;
import com.coyjiv.isocial.domain.Message;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.transfer.message.CreateMessageRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService implements IChatService {

  private final ChatRepository chatRepository;
  private final UserRepository userRepository;
  private final CreateMessageRequestMapper createMessageRequestMapper;

  @Override
  public List<Chat> findAll(int page, int quantity, Long userId) {
    Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate");
    Pageable pageable = PageRequest.of(page,quantity,sort);
    return userRepository.findAllChats(userId,pageable);
  }

  @Override
  public Optional<Chat> findById(Long id) {
    return chatRepository.findById(id);
  }

  @Override
  public Chat create(CreateMessageRequestDto firstMessageDto, Long receiverId) throws AccountNotFoundException {

    Message firstMessage = createMessageRequestMapper.convertToEntity(firstMessageDto);

    User sender = userRepository.findById(firstMessage.getSenderId())
            .orElseThrow(() -> new AccountNotFoundException("User not found"));

    User receiver = userRepository.findById(receiverId)
            .orElseThrow(() -> new AccountNotFoundException("User not found"));


    Chat chat = new Chat();
    chat.setUsers(List.of(sender,receiver));
    chat.setActive(true);
    chatRepository.save(chat);

    firstMessage.setChatId(chat.getId());

    return chat;
  }

  @Override
  public Chat update(Chat chat) {
    return null;
  }

  @Override
  public void delete(Long id) {
    chatRepository.deleteById(id);
  }

}
