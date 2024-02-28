package com.coyjiv.isocial.auth;


import com.coyjiv.isocial.service.user.IUserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
  public static final int ACCESS_LEAVE_HOURS = 6;

  public static final int REFRESH_LEAVE_HOURS = 168;

  private final EmailPasswordAuthProvider emailPasswordAuthProvider;

  @Value("${JWT_SECRET_ACCESS}")
  private String accessSecretLoader;
  private static String jwtAccessSecret;

  @Value("${JWT_SECRET_REFRESH}")
  private String refreshSecretLoader;
  private static String jwtRefreshSecret;

  @PostConstruct
  private void initSecrets() {
    jwtAccessSecret = accessSecretLoader;
    jwtRefreshSecret = refreshSecretLoader;
  }

  public String generateAccessToken(@NotNull String email, @NotNull String password) throws AuthenticationException {

    Authentication authentication = emailPasswordAuthProvider.authenticate(
            new UsernamePasswordAuthenticationToken(email, password, null)
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    return Jwts.builder().setIssuer("ISOCIAL").setSubject("Access Jwt Token")
            .claim("id", authentication.getName())
            .claim("authorities", getAuthorities(authentication.getAuthorities()))
            .setIssuedAt(new Date())
            .setExpiration(getExpirationDate(ACCESS_LEAVE_HOURS))
            .signWith(getKey(jwtAccessSecret)).compact();
  }

  public String generateAccessToken() throws AuthenticationException {
    Authentication authentication = emailPasswordAuthProvider.getSecurityContextAuthentication();

    if (authentication == null) {
      throw new AuthenticationCredentialsNotFoundException("Authentication not found in security context");
    }

    return Jwts.builder().setIssuer("ISOCIAL").setSubject("Access Jwt Token")
            .claim("id", authentication.getName())
            .claim("authorities", getAuthorities(authentication.getAuthorities()))
            .setIssuedAt(new Date())
            .setExpiration(getExpirationDate(ACCESS_LEAVE_HOURS))
            .signWith(getKey(jwtAccessSecret)).compact();
  }

  public String generateRefreshToken() {
    Authentication authentication = emailPasswordAuthProvider.getSecurityContextAuthentication();

    return Jwts.builder().setIssuer("ISOCIAL").setSubject("Refresh Jwt Token")
            .claim("id", authentication.getName())
            .claim("authorities", getAuthorities(authentication.getAuthorities()))
            .setIssuedAt(new Date())
            .setExpiration(getExpirationDate(REFRESH_LEAVE_HOURS))
            .signWith(getKey(jwtRefreshSecret)).compact();
  }

  public void validateAccessToken(@NonNull String token) {
    validateToken(token, getKey(jwtAccessSecret));
  }

  public boolean validateRefreshToken(@NonNull String token) {
    return validateToken(token, getKey(jwtRefreshSecret));
  }


  private boolean validateToken(@NonNull String token, @NonNull Key secret) {
    Claims claims = Jwts.parserBuilder()
            .setSigningKey(secret)
            .build()
            .parseClaimsJws(token)
            .getBody();

    String id = String.valueOf(claims.get("id"));
    String authorities = String.valueOf(claims.get("authorities"));
    Authentication authentication = new UsernamePasswordAuthenticationToken(
            id, null, AuthorityUtils.commaSeparatedStringToAuthorityList(authorities)
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);

    return true;
  }


  private String getAuthorities(Collection<? extends GrantedAuthority> authoritiesList) {
    Set<String> authoritiesSet = new HashSet<>();
    for (GrantedAuthority authority : authoritiesList) {
      authoritiesSet.add(authority.getAuthority());
    }
    return String.join(",", authoritiesSet);
  }

  private Date getExpirationDate(int hours) {
    LocalDateTime now = LocalDateTime.now();
    Instant instant = now.plusSeconds(hours).atZone(ZoneId.systemDefault()).toInstant();
    return Date.from(instant);
  }


  private Key getKey(String secret) {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
  }

}
