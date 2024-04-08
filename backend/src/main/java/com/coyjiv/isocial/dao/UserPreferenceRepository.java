package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {
  Optional<UserPreference> findByUserId(Long userId);
}
