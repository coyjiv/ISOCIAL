package com.coyjiv.isocial.transfer.userpreference;

import com.coyjiv.isocial.domain.UserPreference;
import com.coyjiv.isocial.dto.respone.userpreference.UserPreferenceResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class UserPreferenceResponseMapper extends DtoMapperFacade<UserPreference, UserPreferenceResponseDto> {
  public UserPreferenceResponseMapper() {
    super(UserPreference.class, UserPreferenceResponseDto.class);
  }

  @Override
  protected void decorateDto(UserPreferenceResponseDto dto, UserPreference entity) {
    dto.setUserId(entity.getUser().getId());
  }
}
