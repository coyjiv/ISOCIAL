package com.coyjiv.isocial.filters;

import com.coyjiv.isocial.auth.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class JwtValidatorFilter extends OncePerRequestFilter {
  private static String AUTHORIZATION = "AUTHORIZATION";
  private final JwtTokenProvider jwtTokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
          throws ServletException, IOException {
    String token = getRequestToken(request);
    if (token != null) {
      try {
        jwtTokenProvider.validateAccessToken(token);
      } catch (Exception e) {
        response.sendError(401, "Token not valid !");
      }
    }
    filterChain.doFilter(request, response);
  }


  private String getRequestToken(HttpServletRequest request) {
    String header = request.getHeader(AUTHORIZATION);
    if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
      return header.substring(7);
    }
    return null;
  }
}
