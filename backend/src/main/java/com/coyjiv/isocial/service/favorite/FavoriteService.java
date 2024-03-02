package com.coyjiv.isocial.service.favorite;

import com.coyjiv.isocial.auth.EmailPasswordAuthProvider;
import com.coyjiv.isocial.dao.FavoriteRepository;
import com.coyjiv.isocial.dao.PostRepository;
import com.coyjiv.isocial.domain.Favorite;
import com.coyjiv.isocial.domain.Post;
import com.coyjiv.isocial.dto.request.favorite.FavoriteRequestDto;
import com.coyjiv.isocial.dto.respone.favorite.FavoriteResponseDto;
import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.transfer.favorite.FavoriteRequestMapper;
import com.coyjiv.isocial.transfer.favorite.FavoriteResponseMapper;
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
public class FavoriteService implements IFavoriteService {
  private final FavoriteRepository favoriteRepository;
  private final FavoriteResponseMapper favoriteResponseMapper;
  private final FavoriteRequestMapper favoriteRequestMapper;
  private final EmailPasswordAuthProvider emailPasswordAuthProvider;
  private final PostRepository postRepository;

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
  public List<FavoriteResponseDto> findActiveByPostId( Long id) {

    return favoriteRepository.findAllActiveByPostId(id).stream()
            .map(favoriteResponseMapper::convertToDto).toList();
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<Favorite> findActiveBySelectorIdPostId(Long postId) {
    Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
    System.out.println(favoriteRepository.findActiveBySelectorIdPostId(requestOwner, postId));
    return favoriteRepository.findActiveBySelectorIdPostId(requestOwner, postId);
  }

  @Override
  @Transactional
  public Favorite create(FavoriteRequestDto favoriteRequestDto) throws EntityNotFoundException, IllegalAccessException {
    if (findActiveBySelectorIdPostId(favoriteRequestDto.getSelectedPostId()).isPresent()
            && findActiveBySelectorIdPostId(favoriteRequestDto.getSelectedPostId()).get().isActive()) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }
    if (findActiveBySelectorIdPostId(favoriteRequestDto.getSelectedPostId()).isPresent()
            && !findActiveBySelectorIdPostId(favoriteRequestDto.getSelectedPostId()).get().isActive()) {
      Favorite favorite = findActiveBySelectorIdPostId(favoriteRequestDto.getSelectedPostId()).get();
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
  public void delete(Long postId, boolean noPermission) throws IllegalAccessException {
    Optional<Favorite> favoriteToDeactivate = findActiveBySelectorIdPostId(postId);
    if (favoriteToDeactivate.isPresent()) {
      Favorite favorite = favoriteToDeactivate.get();
      validateFavoriteOwner(favorite.getSelectorId(), noPermission);
      favorite.setActive(false);
      favoriteRepository.save(favorite);
    }
  }

  @Override
  public boolean isFavorite(Long postId) {
    return findActiveBySelectorIdPostId(postId).isPresent();
  }

  @Override
  @Transactional
  public boolean toggle(Long postId) throws EntityNotFoundException, IllegalAccessException {
    validatePost(postId);
    Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
    Optional<Favorite> activeFavorite = favoriteRepository.findActiveBySelectorIdPostId(requestOwner, postId);

    if (activeFavorite.isPresent()) {
      // Found an active favorite, so deactivate it
      Favorite favoriteToDeactivate = activeFavorite.get();
      favoriteToDeactivate.setActive(false);
      favoriteRepository.save(favoriteToDeactivate);
      return false; // Indicates the favorite was deactivated
    } else {
      // No active favorite found, so create a new one
      Favorite newFavorite = new Favorite();
      newFavorite.setSelectedPostId(postId);
      newFavorite.setSelectorId(requestOwner);
      newFavorite.setActive(true); // Ensure this new favorite is active
      favoriteRepository.save(newFavorite);
      return true; // Indicates a new favorite was activated
    }
  }


  private void validateFavoriteOwner(Long selectorId, boolean noPermission) throws IllegalAccessException {
    Long requestOwner = emailPasswordAuthProvider.getAuthenticationPrincipal();
    if (!Objects.equals(selectorId, requestOwner) && noPermission) {
      throw new IllegalAccessException("User have no authorities to do this request.");
    }
  }

  private void validatePost(Long id) throws EntityNotFoundException {
    Optional<Post> selectedPost = postRepository.findActiveById(id);
    if (selectedPost.isEmpty() ) {
      throw new EntityNotFoundException(
              "Post is not exist"
      );
    }
  }

}
