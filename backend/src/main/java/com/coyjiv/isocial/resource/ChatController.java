package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;
import com.coyjiv.isocial.service.chat.IChatService;
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
      return ResponseEntity.ok(chatService.findActiveDtoById(id));
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestParam(name = "receiverId") Long receiverId,
                                  @RequestBody @Valid CreateMessageRequestDto firstMessage) {
    try {

      return ResponseEntity.status(201).body(chatService.create(firstMessage, receiverId));
    } catch (AccountNotFoundException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (Exception exception) {
      exception.printStackTrace();
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
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

}
