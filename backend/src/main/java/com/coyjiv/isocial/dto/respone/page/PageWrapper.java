package com.coyjiv.isocial.dto.respone.page;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PageWrapper<T> {
  private List<T> content;
  private boolean hasNext;
}
