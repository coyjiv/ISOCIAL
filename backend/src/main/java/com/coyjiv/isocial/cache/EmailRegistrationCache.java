package com.coyjiv.isocial.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class EmailRegistrationCache {

  private static final Cache<String, String> confirmationCache = CacheBuilder.newBuilder()
          .expireAfterWrite(24, TimeUnit.HOURS)
          .build();

  public static String putEmail(String email) {
    String uuid = UUID.randomUUID().toString();
    confirmationCache.put(uuid, email);
    return uuid;
  }

  public static String getEmail(String uuid) {
    String email = confirmationCache.getIfPresent(uuid);
    confirmationCache.invalidate(uuid);
    return email;
  }
}
