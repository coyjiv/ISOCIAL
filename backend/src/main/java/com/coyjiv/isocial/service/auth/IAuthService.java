package com.coyjiv.isocial.service.auth;

import com.coyjiv.isocial.dto.request.LoginRequestDto;
import com.coyjiv.isocial.dto.request.RefreshRequestDto;
import com.coyjiv.isocial.dto.respone.LoginResponseDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public interface IAuthService {
  LoginResponseDto login(LoginRequestDto loginRequestDto);
  LoginResponseDto refresh(RefreshRequestDto refreshRequestDto) throws Exception;
}
