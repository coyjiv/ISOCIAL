package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.exceptions.ChatAlreadyExistException;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.chat.ChatService;
import com.coyjiv.isocial.service.chat.IChatService;
import io.sentry.Sentry;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chats")
public class ChatController {
  private final ChatService chatService;


  @GetMapping
  public ResponseEntity<?> findAllActive(@RequestParam("page") Integer page,
                                         @RequestParam("quantity") Integer quantity) {
    return ResponseEntity.ok(chatService.findAllActive(page, quantity));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findActiveById(@PathVariable(name = "id") Long id)
    throws EntityNotFoundException, IllegalAccessException {
    return ResponseEntity.ok(chatService.findActiveDtoById(id));
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestParam(name = "receiverId") Long receiverId,
                                  @RequestBody @Valid CreateMessageRequestDto firstMessage)
    throws EntityNotFoundException, RequestValidationException, IllegalAccessException {
    try {
      return ResponseEntity.status(201).body(chatService.create(firstMessage, receiverId));
    } catch (ChatAlreadyExistException exception) {
      Sentry.captureException(exception);
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable(name = "id") Long id)
    throws EntityNotFoundException, IllegalAccessException {
    chatService.delete(id);
    return ResponseEntity.status(204).build();
  }

  @GetMapping("/getChatId/{userId}")
  public ResponseEntity<?> getChatId(@PathVariable(name = "userId") Long userId)
    throws EntityNotFoundException {
    return ResponseEntity.ok(chatService.isUserInvolvedInChat(userId));
  }
}
