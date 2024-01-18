package com.coyjiv.isocial.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends AbstractEntity {
  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

  @Column(name = "city")
  private String city;

  @Column(name = "password")
  private String password;

  @Column(name = "avatars_url")
  private List<String> avatarsUrl;

  @Column(name = "banner_url")
  private String bannerUrl;

  @Column(name = "bio")
  private String bio;

  @Column(name = "is_private")
  private boolean isPrivate;

  @Column(name = "last_seen")
  private Date lastSeen;

  @OneToMany
  private List<Chat> chats;

  @Column(name = "date_of_birth")
  private Date dateOfBirth;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  private Set<Role> roles;

}
