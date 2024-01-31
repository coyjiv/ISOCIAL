package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

@Service
public class PostRequestMapper extends DtoMapperFacade<Post, PostRequestDto> {
    public PostRequestMapper(PostRepository postRepository) {
        super(Post.class, PostRequestDto.class);
    }

    @Override
    protected void decorateEntity(Post entity, PostRequestDto dto) {
        entity.setActive(true);
        entity.setEdited(false);
    }

}
