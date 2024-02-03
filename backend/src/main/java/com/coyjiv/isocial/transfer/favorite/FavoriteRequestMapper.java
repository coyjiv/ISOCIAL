package com.coyjiv.isocial.transfer.favorite;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.favorite.FavoriteRequestDto;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteRequestMapper extends DtoMapperFacade<Favorite, FavoriteRequestDto> {
    public FavoriteRequestMapper() {super(Favorite.class, FavoriteRequestDto.class);}
    @Override
    protected void decorateEntity(Favorite entity, FavoriteRequestDto dto) {
        entity.setActive(true);
    }
}
