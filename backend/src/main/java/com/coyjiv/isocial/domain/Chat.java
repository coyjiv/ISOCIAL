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

  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinTable(name = "users_chats",
          joinColumns = @JoinColumn(name = "chat_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
  )
  private List<User> users;

}

