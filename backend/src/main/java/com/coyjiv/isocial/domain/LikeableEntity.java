package com.coyjiv.isocial.domain;

public enum LikeableEntity {
  POST("POST"),
  COMMENT("COMMENT"),
  MESSAGE("MESSAGE");

  private final String entityType;

  LikeableEntity(String entityType) {
    this.entityType = entityType;
  }

  public String getEntityType() {
    return entityType;
  }

  public static LikeableEntity fromString(String entityType) {
    for (LikeableEntity entity : LikeableEntity.values()) {
      if (entity.getEntityType().equalsIgnoreCase(entityType)) {
        return entity;
      }
    }
    throw new IllegalArgumentException("Unknown entity type: " + entityType);
  }
}
