package com.coyjiv.isocial.cache;

import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class OnlineUsersCache {

  private static final Cache<String, String> onlineUsersCache = CacheBuilder.newBuilder()
          .expireAfterWrite(24, TimeUnit.HOURS)
          .build();

  public static void putUserId(String sessionId, Long userId) {
    onlineUsersCache.put(sessionId, String.valueOf(userId));
  }

  public static Long getUserId(String uuid) throws EntityNotFoundException {
    String userId = onlineUsersCache.getIfPresent(uuid);
    onlineUsersCache.invalidate(uuid);
    if (Objects.equals(userId, "null")) {
      throw new EntityNotFoundException("User not found");
    }
    return Long.valueOf(userId);
  }
}
