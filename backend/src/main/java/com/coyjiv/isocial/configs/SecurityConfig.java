package com.coyjiv.isocial.configs;

import com.coyjiv.isocial.auth.DefaultAuthenticationSuccessHandler;
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
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.Collections;
import java.util.List;

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

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http,
                                                 HandlerMappingIntrospector introspector) throws Exception {
    MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

    return http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
            .csrf(AbstractHttpConfigurer::disable)
            // TODO: REMOVE IN PRODUCTION
            .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
              @Override
              public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("*"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L);
                return config;
              }
            }))
            .httpBasic(AbstractHttpConfigurer::disable)
            .addFilterBefore(new JwtValidatorFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(req ->
                    req
                            .requestMatchers(mvcMatcherBuilder.pattern("/api/auth/**")).permitAll()
                            .requestMatchers(mvcMatcherBuilder.pattern("/api/users/**")).permitAll()
                            .requestMatchers(mvcMatcherBuilder.pattern("/swagger-ui/**")).permitAll()
                            .requestMatchers(mvcMatcherBuilder.pattern("/v3/api-docs/**")).permitAll()
                            .requestMatchers(toH2Console()).permitAll()
                            .anyRequest().hasRole("USER")
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
