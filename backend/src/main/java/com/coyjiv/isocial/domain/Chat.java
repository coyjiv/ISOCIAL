package com.coyjiv.isocial.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "chats")
public class Chat extends AbstractEntity {

  @ManyToMany(mappedBy = "chats")
  private List<User> users;

}

