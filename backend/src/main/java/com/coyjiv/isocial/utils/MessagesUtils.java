package com.coyjiv.isocial.utils;

import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.exceptions.RequestValidationException;

import java.util.Objects;
import java.util.Optional;

public class MessagesUtils {
  public static void validateFirstMessage(CreateMessageRequestDto firstMessageDto) throws RequestValidationException {

    if (firstMessageDto.getAttachements() != null && !firstMessageDto.getAttachements().isEmpty()){
      if (firstMessageDto.getAttachements().stream().anyMatch(Objects::isNull) ||
              firstMessageDto.getAttachements().stream().anyMatch(String::isBlank)
      ){
        throw new RequestValidationException(
                "Message should have text or attachments, attachments should not have empty strings or nulls"
        );
      }
    }

    if (firstMessageDto.getText() == null || firstMessageDto.getText().isBlank()){
      if (firstMessageDto.getAttachements() == null || firstMessageDto.getAttachements().isEmpty()){
        throw new RequestValidationException(
                "Message should have text or attachments, attachments should not have empty strings or nulls"
        );
      }
    }


  }
}
