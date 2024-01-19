package com.coyjiv.isocial.service.auth;

import com.coyjiv.isocial.auth.JwtTokenProvider;
import com.coyjiv.isocial.dto.request.LoginRequestDto;
import com.coyjiv.isocial.dto.request.RefreshRequestDto;
import com.coyjiv.isocial.dto.respone.LoginResponseDto;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

  private final JwtTokenProvider tokenProvider;

  @Override
  public LoginResponseDto login(LoginRequestDto loginRequestDto) {
    String access = tokenProvider.generateAccessToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());
    String refresh = tokenProvider.generateRefreshToken();
    return new LoginResponseDto(access, refresh);
  }

  @Override
  public LoginResponseDto refresh(RefreshRequestDto refreshRequestDto) throws Exception {
    if (JwtTokenProvider.validateRefreshToken(refreshRequestDto.getRefresh())) {
      String access = tokenProvider.generateAccessToken();
      String refresh = tokenProvider.generateRefreshToken();
      return new LoginResponseDto(access, refresh);
    } else {
      throw new AuthException("Token not valid !");
    }
  }
}
