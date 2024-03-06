package com.coyjiv.isocial.dto.respone.friend;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomFriendResponse {

  private List<FriendResponseDto> content;
  private boolean hasNext;

}
