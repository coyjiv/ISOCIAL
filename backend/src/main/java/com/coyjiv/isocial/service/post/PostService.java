package com.coyjiv.isocial.service.post;

import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.dto.request.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;
import com.coyjiv.isocial.transfer.post.PostRequestMapper;
import com.coyjiv.isocial.transfer.post.PostResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {
    private final PostRepository postRepository;
    private final PostRequestMapper postRequestMapper;
    private final PostResponseMapper postResponseMapper;

    @Transactional(readOnly = true)
    @Override
    public List<Post> findAllActive(int page, int size) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "creationDate"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return postRepository.findAllActive(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Post> findActiveById(Long id) {
        return postRepository.findActiveById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PostResponseDto> findActiveByAuthorId(int page, int size, Long id) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "creationDate"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        return postRepository.findActiveByAuthorId(id, pageable).stream()
                .map(postResponseMapper::convertToDto).toList();
    }

    @Override
    @Transactional
    public Post create(PostRequestDto postRequestDto) {
//        TODO Later find user ID who create the post
        Post post = postRequestMapper.convertToEntity(postRequestDto);
        return postRepository.save(post);
    }

    @Override
    @Transactional
    public void update(Long id, UpdatePostRequestDto updatePostRequestDto) {
//        TODO Later check the user who create the post is trying to
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setTextContent(updatePostRequestDto.getTextContent());
            post.setEdited(true);
            postRepository.save(post);
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Optional<Post> postToDeactivate = postRepository.findActiveById(id);
        if (postToDeactivate.isPresent()) {
            Post post = postToDeactivate.get();
            post.setActive(false);
            postRepository.save(post);
        }
    }
}
