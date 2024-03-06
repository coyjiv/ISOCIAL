package com.coyjiv.isocial.configs.auth;

import com.coyjiv.isocial.auth.DefaultAuthenticationSuccessHandler;
import com.coyjiv.isocial.auth.JwtTokenProvider;
import com.coyjiv.isocial.filters.JwtValidatorFilter;
import com.coyjiv.isocial.service.auth.OAuthUserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.Collections;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
  @Value("${SECURITY_USERNAME}")
  String inMemoryUserName;

  @Value("${SECURITY_PASSWORD}")
  String inMemoryUserPassword;

  private final OAuthUserService googleAuthUserService;
  private final DefaultAuthenticationSuccessHandler defaultAuthenticationSuccessHandler;
  private final JwtTokenProvider jwtTokenProvider;

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http,
                                                 HandlerMappingIntrospector introspector) throws Exception {
    MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

    return http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
            .csrf(AbstractHttpConfigurer::disable)
            // TODO: REMOVE IN PRODUCTION
            .cors(corsCustomizer -> corsCustomizer.configurationSource(request -> {
              CorsConfiguration config = new CorsConfiguration();
              config.setAllowedOriginPatterns(Collections.singletonList("*"));
              config.setAllowedMethods(Collections.singletonList("*"));
              config.setAllowedHeaders(Collections.singletonList("*"));
              config.setAllowCredentials(true);
              config.setMaxAge(3600L);
              return config;
            }))
            .httpBasic(AbstractHttpConfigurer::disable)
            .addFilterBefore(new JwtValidatorFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(req ->
                    req
                            .requestMatchers(mvcMatcherBuilder.pattern("/api/auth/**")).permitAll()
                            .requestMatchers(mvcMatcherBuilder.pattern("/api/ws/**")).permitAll()
                            .requestMatchers(mvcMatcherBuilder.pattern("/api/**")).hasRole("USER")
                            .anyRequest().permitAll()
            )
            .exceptionHandling(exceptionHandling ->
                    exceptionHandling.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
            .oauth2Login(oauth -> oauth
                    .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
                            .userService(googleAuthUserService)
                    )
                    .successHandler(defaultAuthenticationSuccessHandler)
            )
            .build();
  }
}
