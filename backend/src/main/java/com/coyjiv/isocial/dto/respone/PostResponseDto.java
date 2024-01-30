package com.coyjiv.isocial.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDto {
    private Long id;

    private String textContent;

    private List<String> attachments;

    private boolean isEdited;

    private boolean isReposted;

    private Long originalPostId;

    private Long authorId;
}
