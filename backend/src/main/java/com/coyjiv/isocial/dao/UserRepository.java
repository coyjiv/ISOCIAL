package com.coyjiv.isocial.dao;

import com.coyjiv.isocial.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  @Override
  Page<User> findAll(Pageable pageable);

  @Query("from User u where u.email = :email")
  Optional<User> findByEmail(@Param("email") String email);

  boolean existsUserByEmail(String email);

  @Query("SELECT u FROM User u WHERE "
          + "LOWER(u.firstName) LIKE LOWER(CONCAT(:name, '%')) "
          + "OR LOWER(u.lastName) LIKE LOWER(CONCAT(:name, '%'))")
  Page<User> findByName(@Param("name") String name, Pageable pageable);

  @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT(:startsWithFirstName, '%'))"
          + " AND LOWER(u.lastName) LIKE LOWER(CONCAT(:startsWithLastName, '%'))"
          + " OR LOWER(u.firstName) LIKE LOWER(CONCAT(:startsWithLastName, '%'))"
          + "AND LOWER(u.lastName) LIKE LOWER(CONCAT(:startsWithFirstName, '%'))")
  Page<User> findByFullName(@Param("startsWithFirstName") String startsWithFirstName,
                            @Param("startsWithLastName") String startsWithLastName, Pageable pageable);
}
