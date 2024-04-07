package com.coyjiv.isocial.resource.rest;

import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.dto.request.message.UpdateMessageRequestDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
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
@RequestMapping("/api/messages")
public class MessageController {
  private final IMessageService messageService;

  @GetMapping
  public ResponseEntity<?> findAllActiveByChatId(@RequestParam(name = "page") Integer page,
                                                 @RequestParam(name = "quantity") Integer quantity,
                                                 @RequestParam(name = "chatId") Long chatId)
          throws EntityNotFoundException, IllegalAccessException {
    return ResponseEntity.ok(messageService.findAllActiveByChatId(page, quantity, chatId));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findActiveById(@PathVariable(name = "id") Long id)
          throws EntityNotFoundException, IllegalAccessException {
    return ResponseEntity.ok(messageService.findActiveById(id));
  }

  @GetMapping("/search")
  public ResponseEntity<?> search(@RequestParam("term") String term,
                                  @RequestParam("page") Integer page,
                                  @RequestParam("size") Integer size) {
    return ResponseEntity.ok(messageService.search(term, page, size));
  }

  @GetMapping("/unread")
  public ResponseEntity<?> countUnread() {
    return ResponseEntity.ok(messageService.countUnreadMessages());
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestParam(name = "chatId") Long chatId,
                                  @RequestBody @Valid CreateMessageRequestDto createMessageRequestDto)
          throws EntityNotFoundException, RequestValidationException, IllegalAccessException {
    return ResponseEntity.status(201).body(messageService.create(chatId, createMessageRequestDto));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable(name = "id") Long id,
                                  @RequestBody @Valid UpdateMessageRequestDto updateMessageRequestDto)
          throws EntityNotFoundException, IllegalAccessException {
    return ResponseEntity.ok(messageService.update(id, updateMessageRequestDto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable(name = "id") Long id)
          throws EntityNotFoundException, IllegalAccessException {
    messageService.delete(id);
    return ResponseEntity.status(204).build();
  }
}
