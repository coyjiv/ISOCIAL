package com.coyjiv.isocial.domain;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "favorites")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Favorite extends AbstractEntity {
    @Column(name = "selected_post_id")
    private Long selectedPostId;

    @Column(name = "user_selector_id")
    private Long selectorId;
}
