package com.coyjiv.isocial.configs.ws;


import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;


@Configuration
public class StreamAppConfig {

  @Configuration
  public static class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {
    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
      messages
              .nullDestMatcher().permitAll()
              .anyMessage().permitAll();
    }

    @Override
    protected boolean sameOriginDisabled() {
      return true;
    }
  }
}