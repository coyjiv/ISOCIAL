package com.coyjiv.isocial.utils;

import com.coyjiv.isocial.dto.request.message.CreateMessageRequestDto;
import com.coyjiv.isocial.exceptions.RequestValidationException;

import java.util.Objects;
import java.util.Optional;

public class MessagesUtils {
  public static void validateFirstMessage(CreateMessageRequestDto firstMessageDto) throws RequestValidationException {

    if (firstMessageDto.getAttachments() != null && !firstMessageDto.getAttachments().isEmpty()) {
      if (firstMessageDto.getAttachments().stream().anyMatch(Objects::isNull)
              ||
              firstMessageDto.getAttachments().stream().anyMatch(String::isBlank)
      ) {
        throw new RequestValidationException(
                "Message should have text or attachments, attachments should not have empty strings or nulls"
        );
      }
    }

    if (firstMessageDto.getText() == null || firstMessageDto.getText().isBlank()) {
      if (firstMessageDto.getAttachments() == null || firstMessageDto.getAttachments().isEmpty()) {
        throw new RequestValidationException(
                "Message should have text or attachments, attachments should not have empty strings or nulls"
        );
      }
    }


  }
}
