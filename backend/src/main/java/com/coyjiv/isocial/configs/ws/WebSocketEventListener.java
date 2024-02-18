package com.coyjiv.isocial.configs.ws;

import com.coyjiv.isocial.auth.JwtTokenProvider;
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

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

  private final JwtTokenProvider jwtTokenProvider;
  private final IUserService userService;

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectEvent event) {
    StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
    String token = headers.getFirstNativeHeader("Authorization");
    if (token != null) {
      userService.handleConnect(token.substring(7));
    }
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
    String token = headers.getFirstNativeHeader("Authorization");
    if (token != null) {
      userService.handleDisconnect(token.substring(7));
    }
  }
}
