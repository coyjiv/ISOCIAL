package com.coyjiv.isocial.service.favorite;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.FavoriteRepository;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.favorite.FavoriteRequestDto;
import com.coyjiv.isocial.dto.request.post.PostRequestDto;
import com.coyjiv.isocial.dto.request.post.RePostRequestDto;
import com.coyjiv.isocial.dto.request.post.UpdatePostRequestDto;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.dto.respone.post.PostResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import com.coyjiv.isocial.service.post.IPostService;
import com.coyjiv.isocial.transfer.favorite.FavoriteRequestMapper;
import com.coyjiv.isocial.transfer.favorite.FavoriteResponseMapper;
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
public class FavoriteService implements IFavoriteService{
    private final FavoriteRepository favoriteRepository;
    private final FavoriteResponseMapper favoriteResponseMapper;
    private final FavoriteRequestMapper favoriteRequestMapper;
    private final EmailPasswordAuthProvider emailPasswordAuthProvider;
    private final IPostService postService;

    @Transactional(readOnly = true)
    @Override
    public List<FavoriteResponseDto> findAllActive(int page, int size) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "creationDate"));
        Pageable pageable = PageRequest.of(page, size, sort);
        return favoriteRepository.findAllActive(pageable).stream()
                .map(favoriteResponseMapper::convertToDto).toList();
    }
    @Override
    @Transactional(readOnly = true)
    public Optional<Favorite> findActiveById(Long id) {
        return favoriteRepository.findActiveById(id);
    }
    @Override
    @Transactional(readOnly = true)
    public List<FavoriteResponseDto> findActiveBySelectorId(int page, int size, Long id) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "creationDate"));
        Pageable pageable = PageRequest.of(page, size, sort);
        return favoriteRepository.findAllActiveBySelectorId(id, pageable).stream()
                .map(favoriteResponseMapper::convertToDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteResponseDto> findActiveByPostId(int page, int size, Long id) {
        Sort sort = Sort.by(new Sort.Order(Sort.Direction.ASC, "creationDate"));
        Pageable pageable = PageRequest.of(page, size, sort);
        return favoriteRepository.findAllActiveByPostId(id, pageable).stream()
                .map(favoriteResponseMapper::convertToDto).toList();
    }

//    @Override
    @Transactional(readOnly = true)
    public Optional<Favorite> findActiveBySelectorIdPostId (Long postId){
        Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
        return favoriteRepository.findActiveBySelectorIdPostId(requestOwner, postId);
    }

    @Override
    @Transactional
    public Favorite create(FavoriteRequestDto favoriteRequestDto) throws EntityNotFoundException, IllegalAccessException {
        if(findActiveBySelectorIdPostId (favoriteRequestDto.getSelectedPostId()).isPresent()
                && findActiveBySelectorIdPostId (favoriteRequestDto.getSelectedPostId()).get().isActive()){
            throw new IllegalAccessException("User have no authorities to do this request.");
        }
        if(findActiveBySelectorIdPostId (favoriteRequestDto.getSelectedPostId()).isPresent()
                && !findActiveBySelectorIdPostId (favoriteRequestDto.getSelectedPostId()).get().isActive()){
            Favorite favorite = findActiveBySelectorIdPostId (favoriteRequestDto.getSelectedPostId()).get();
            favorite.setActive(true);
            return favoriteRepository.save(favorite);
        }
        validatePost(favoriteRequestDto.getSelectedPostId());
        Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
        Favorite favorite = favoriteRequestMapper.convertToEntity(favoriteRequestDto);
        favorite.setSelectorId(requestOwner);
        return favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void delete(Long id) throws IllegalAccessException  {
        Optional<Favorite> favoriteToDeactivate = favoriteRepository.findActiveById(id);
        if (favoriteToDeactivate.isPresent()) {
            Favorite favorite = favoriteToDeactivate.get();
            validateFavoriteOwner(favorite.getSelectorId());
            favorite.setActive(false);
            favoriteRepository.save(favorite);
        }
    }


    private void validateFavoriteOwner(Long selectorId) throws IllegalAccessException {
        Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
        if (!Objects.equals(selectorId, requestOwner)) {
            throw new IllegalAccessException("User have no authorities to do this request.");
        }
    }
    private void validatePost(Long id) throws EntityNotFoundException {
        Optional <Post> selectedPost = postService.findActiveById(id);
        if(selectedPost.isEmpty()){
            throw new EntityNotFoundException(
                    "Post is not exist"
            );
        }
    }

}
