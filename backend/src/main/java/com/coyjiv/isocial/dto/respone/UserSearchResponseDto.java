package com.coyjiv.isocial.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserSearchResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private List<String> avatarsUrl;
}
