package com.coyjiv.isocial.configs.ws;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.auth.JwtTokenProvider;
import com.coyjiv.isocial.cache.OnlineUsersCache;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

  private final EmailPasswordAuthProvider authProvider;
  private final IUserService userService;

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectEvent event) throws IllegalAccessException {
    StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
    String token = headers.getFirstNativeHeader("Authorization");

    if (token != null && !Objects.equals(token, "Bearer null")) {
      userService.handleConnect(token.substring(7));
      OnlineUsersCache.putUserId(headers.getSessionId(),authProvider.getAuthenticationPrincipal());
    }
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) throws EntityNotFoundException {
    StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
    Long userId = OnlineUsersCache.getUserId(headers.getSessionId());
    userService.handleDisconnect(userId);
  }
}
