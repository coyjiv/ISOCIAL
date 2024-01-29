package com.coyjiv.isocial.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "chats")
public class Chat extends AbstractEntity {

  @Column(name = "last_message")
  private String lastMessage;

  @Column(name = "last_message_date")
  private Date lastMessageDate;

  @Column(name = "last_message_by")
  private Long lastMessageBy;

  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinTable(name = "users_chats",
          joinColumns = @JoinColumn(name = "chat_id", referencedColumnName = "id"),
          inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
  )
  private List<User> users;

}

