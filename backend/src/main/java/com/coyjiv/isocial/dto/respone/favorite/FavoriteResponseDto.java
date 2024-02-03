package com.coyjiv.isocial.dto.respone.favorite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteResponseDto {
    private Long id;
    private Long selectedPostId;
    private Long selectorId;
}
