package com.coyjiv.isocial.dto.request.message;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMessageRequestDto {

  private String text;

  private List<String> attachments;
}
