package com.coyjiv.isocial.transfer.post;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.dto.request.UserUpdateRequestDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Set;

@Service
public class PostRequestMapper extends DtoMapperFacade<Post, PostRequestDto> {
    private final PostRepository postRepository;

    public PostRequestMapper(PostRepository postRepository) {
        super(Post.class, PostRequestDto.class);
        this.postRepository = postRepository;
    }


    @Override
    protected void decorateEntity(Post entity, PostRequestDto dto) {
        entity = postRepository.findById(dto.getId()).get();
        entity.setTextContent(dto.getTextContent());
        entity.setAttachments(dto.getAttachments());
        entity.setOriginalPostId(dto.getOriginalPostId());
        entity.setAuthor( postRepository.findById(dto.getAuthorId()).get().getAuthor() );
    }

}
