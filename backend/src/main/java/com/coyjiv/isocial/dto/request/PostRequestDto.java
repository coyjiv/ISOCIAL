package com.coyjiv.isocial.dto.request;
import com.coyjiv.isocial.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDto {
    @NotNull
    private Long id;

    @NotNull
    @Size(min = 1, message = "text should have at least 1 character")
    private String textContent;

    private List<String> attachments;

    private boolean isEdited;

    private boolean isReposted;

    private Long originalPostId;

    private Long authorId;



}
