package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.request.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.UpdateMessageRequestDto;
import com.coyjiv.isocial.exceptions.ChatNotFoundException;
import com.coyjiv.isocial.exceptions.MessageNotFoundException;
import com.coyjiv.isocial.service.message.IMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {
  private final IMessageService messageService;

  @GetMapping
  public ResponseEntity<?> findAllActiveByChatId(@RequestParam(name = "page") Integer page,
                                                 @RequestParam(name = "quantity") Integer quantity,
                                                 @RequestParam(name = "chatId") Long chatId) {
    try {
      return ResponseEntity.ok(messageService.findAllActiveByChatId(page, quantity, chatId));
    } catch (ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findActiveById(@PathVariable(name = "id") Long id) {
    try {
      return ResponseEntity.ok(messageService.findActiveById(id));
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (MessageNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestParam(name = "chatId") Long chatId,
                                  @RequestBody @Valid CreateMessageRequestDto createMessageRequestDto) {
    try {
      return ResponseEntity.status(201).body(messageService.create(chatId, createMessageRequestDto));
    } catch (ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable(name = "id") Long id,
                                  @RequestBody @Valid UpdateMessageRequestDto updateMessageRequestDto) {
    try {
      return ResponseEntity.ok(messageService.update(id, updateMessageRequestDto));
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (MessageNotFoundException | ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
    try {
      messageService.delete(id);
      return ResponseEntity.status(204).build();
    } catch (IllegalAccessException exception) {
      return ResponseEntity.status(403).body(exception.getMessage());
    } catch (ChatNotFoundException exception) {
      return ResponseEntity.status(404).body(exception.getMessage());
    } catch (Exception exception) {
      return ResponseEntity.status(400).body(exception.getMessage());
    }
  }
}
