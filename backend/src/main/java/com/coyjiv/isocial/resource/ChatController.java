package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.exceptions.ChatAlreadyExistException;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;
import com.coyjiv.isocial.service.chat.IChatService;
import com.coyjiv.isocial.service.message.IMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chats")
public class ChatController {
  private final IChatService chatService;

  @GetMapping
  public ResponseEntity<?> findAllActive(@RequestParam("page") Integer page,
                                         @RequestParam("quantity") Integer quantity) {
    return ResponseEntity.ok(chatService.findAllActive(page, quantity));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findActiveById(@PathVariable(name = "id") Long id) {
    try {
      return ResponseEntity.ok(chatService.findActiveById(id));
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    }
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestParam(name = "receiverId") Long receiverId,
                                  @RequestBody @Valid CreateMessageRequestDto firstMessage) {
    try {
      chatService.create(firstMessage, receiverId);
      return ResponseEntity.status(201).build();
    } catch (AccountNotFoundException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (ChatAlreadyExistException exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
    try {
      chatService.delete(id);
      return ResponseEntity.status(204).build();
    } catch (ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    }
  }

}
