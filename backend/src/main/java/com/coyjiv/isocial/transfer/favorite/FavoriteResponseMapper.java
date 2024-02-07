package com.coyjiv.isocial.transfer.favorite;

import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.favorite.FavoriteRequestDto;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class FavoriteResponseMapper extends DtoMapperFacade<Favorite, FavoriteResponseDto> {
  public FavoriteResponseMapper() {
    super(Favorite.class, FavoriteResponseDto.class);
  }
}
