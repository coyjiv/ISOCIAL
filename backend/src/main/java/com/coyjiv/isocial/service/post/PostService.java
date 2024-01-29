package com.coyjiv.isocial.service.post;

import com.coyjiv.isocial.cache.EmailRegistrationCache;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.dto.request.PostRequestDto;
import com.coyjiv.isocial.service.post.IPostService;
import com.coyjiv.isocial.transfer.post.PostRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {
    private final PostRepository postRepository;
    private final PostRequestMapper postRequestMapper;

    @Transactional
    public Post createPost(PostRequestDto postRequestDto)  {
        Post post = postRequestMapper.convertToEntity(postRequestDto);
        return postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public List<Post> findAll() {return postRepository.findAll();}

    @Transactional(readOnly = true)
    public List<Post> findAll(int page, int size) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "id"));
        Pageable pageable = (Pageable) PageRequest.of(page - 1, size, sort);
        Page<Post> postPage = postRepository.findAll(pageable);
        return postPage.toList();
    }

    @Transactional(readOnly = true)
    public Optional<Post> findPostByPostId(Long id) {
        return postRepository.findPostByPostId(id);
    }

    @Transactional(readOnly = true)
    public List<Post> findPostsByAuthorId(Long id) {return postRepository.findPostsByAuthorId(id);}

    @Transactional
    public Post updatePost(Post post) {
        Post post1 = postRepository.findById(post.getId()).get();
        return postRepository.save(post1);
    }

    @Transactional
    public void deleteUser(Long id) {
        postRepository.deleteById(id);
    }
}
