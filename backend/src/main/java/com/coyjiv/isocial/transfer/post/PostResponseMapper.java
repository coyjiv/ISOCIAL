package com.coyjiv.isocial.transfer.post;

import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;
import com.coyjiv.isocial.dto.respone.UserResponseDto;
import com.coyjiv.isocial.transfer.DtoMapperFacade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostResponseMapper extends DtoMapperFacade<Post, PostResponseDto>{
    public PostResponseMapper() {
        super(Post.class, PostResponseDto.class);
    }

    @Override
    protected void decorateDto(PostResponseDto dto, Post entity) {
        dto.setId(dto.getId());
        dto.setTextContent(entity.getTextContent());;
        dto.setAttachments(entity.getAttachments());
        dto.setOriginalPostId(entity.getOriginalPostId());
        dto.setAuthorId(entity.getAuthor().getId());
    }
}
