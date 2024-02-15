package com.coyjiv.isocial.service.auth;

import com.coyjiv.isocial.dto.request.auth.LoginRequestDto;
import com.coyjiv.isocial.dto.request.auth.RefreshRequestDto;
import com.coyjiv.isocial.dto.respone.auth.LoginResponseDto;

public interface IAuthService {
  LoginResponseDto login(LoginRequestDto loginRequestDto);

  LoginResponseDto refresh(RefreshRequestDto refreshRequestDto) throws Exception;
}
