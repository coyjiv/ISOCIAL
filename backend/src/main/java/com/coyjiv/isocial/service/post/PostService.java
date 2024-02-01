package com.coyjiv.isocial.service.post;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.request.post.RePostRequestDto;
import com.coyjiv.isocial.dto.request.post.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.PostResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.user.UserService;
import com.coyjiv.isocial.transfer.post.PostRequestMapper;
import com.coyjiv.isocial.transfer.post.PostResponseMapper;
import com.coyjiv.isocial.transfer.post.RePostRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {
    private final PostRepository postRepository;
    private final PostRequestMapper postRequestMapper;
    private final RePostRequestMapper rePostRequestMapper;
    private final PostResponseMapper postResponseMapper;
    private final EmailPasswordAuthProvider emailPasswordAuthProvider;
    private final UserRepository userRepository;

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
    public Post create(PostRequestDto postRequestDto) throws RequestValidationException {
        validateCreationPostDto(postRequestDto);
        Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
        Post post = postRequestMapper.convertToEntity(postRequestDto);
        post.setAuthorId(requestOwner);
        return postRepository.save(post);
    }

    @Override
    @Transactional
    public Post repost (RePostRequestDto rePostRequestDto) throws RequestValidationException {
        Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
        Post post = rePostRequestMapper.convertToEntity(rePostRequestDto);
        Post originalPost = findActiveById(post.getOriginalPostId()).get();
        validateRePostDto(originalPost);
        if(originalPost.getOriginalPostId() != null){
            post.setOriginalPostId(originalPost.getOriginalPostId());
        }
        post.setAuthorId(requestOwner);


        return postRepository.save(post);
    }

    @Override
    @Transactional
    public void update(Long id, UpdatePostRequestDto updatePostRequestDto) throws IllegalAccessException {
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            validateRequestOwner(post.getAuthorId());
            post.setTextContent(updatePostRequestDto.getTextContent());
            post.setEdited(true);
            postRepository.save(post);
        }
    }

    @Override
    @Transactional
    public void delete(Long id) throws IllegalAccessException {
        Optional<Post> postToDeactivate = postRepository.findActiveById(id);
        if (postToDeactivate.isPresent()) {
            Post post = postToDeactivate.get();
            validateRequestOwner(post.getAuthorId());
            post.setActive(false);
            postRepository.save(post);
        }
        List<Post> repostedToDeactivate =postRepository.findAllActiveReposts(id);
        if (!repostedToDeactivate.isEmpty()){
            repostedToDeactivate.forEach(entry ->{
                Long idReposted = entry.getId();
                Optional<Post> repostToDeactivate = postRepository.findActiveById(idReposted);
                if (repostToDeactivate.isPresent()) {
                    Post repost = repostToDeactivate.get();
                    try {
                        validateRequestOwner(repost.getAuthorId());
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                    repost.setActive(false);
                    postRepository.save(repost);
                }
            });
        }


    }

    private void validateRequestOwner (Long authorId) throws IllegalAccessException {
        Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
        if(!Objects.equals(authorId,requestOwner)){
            throw new IllegalAccessException("User have no authorities to do this request.");
        }
    }

    private void validateRePostDto(Post originalPost) throws RequestValidationException {
       if( userRepository.findActiveById(originalPost.getAuthorId()).get().isPrivate()){
           throw new RequestValidationException(
                   "User have no authorities to do this request."
           );
       }
    }


    private void validateCreationPostDto(PostRequestDto postRequestDto) throws RequestValidationException {
        if (postRequestDto.getAttachments() != null && !postRequestDto.getAttachments().isEmpty()) {
            if (postRequestDto.getAttachments().stream().anyMatch(Objects::isNull)
                    ||
                    postRequestDto.getAttachments().stream().anyMatch(String::isBlank)
            ) {
                throw new RequestValidationException(
                        "Post should have text or attachments, attachments should not have empty strings or nulls"
                );
            }
        }

        if (postRequestDto.getTextContent() == null || postRequestDto.getTextContent().isBlank()) {
            if (postRequestDto.getAttachments() == null || postRequestDto.getAttachments().isEmpty()) {
                throw new RequestValidationException(
                        "Post should have text or attachments, attachments should not have empty strings or nulls"
                );
            }
        }
    }
}
