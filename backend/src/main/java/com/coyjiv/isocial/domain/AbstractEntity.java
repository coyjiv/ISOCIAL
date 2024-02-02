package com.coyjiv.isocial.domain;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Temporal;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

import static jakarta.persistence.TemporalType.TIMESTAMP;

@Getter
@Setter
@MappedSuperclass
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = "id")
public abstract class AbstractEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @CreatedDate
  @Temporal(TIMESTAMP)
  @Column(name = "creation_date")
  protected Date creationDate;

  @LastModifiedDate
  @Temporal(TIMESTAMP)
  @Column(name = "last_modified_date")
  protected Date lastModifiedDate;

  @Column(name = "is_active")
  private boolean isActive;

  public AbstractEntity(boolean isActive) {
    this.isActive = isActive;
  }
}
