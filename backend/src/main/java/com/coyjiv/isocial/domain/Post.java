package com.coyjiv.isocial.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Post extends AbstractEntity {
    @Column(name = "text_content")
    private String textContent;

    @Column(name = "attachments")
    private List<String> attachments;

    @Column(name = "is_edited")
    private boolean isEdited;

    @Column(name = "original_post_id")
    private Long originalPostId;

    @Column(name = "user_id")
    private Long authorId;

}
