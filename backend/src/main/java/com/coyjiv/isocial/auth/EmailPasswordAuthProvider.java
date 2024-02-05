package com.coyjiv.isocial.auth;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Role;
import com.coyjiv.isocial.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmailPasswordAuthProvider implements AuthenticationProvider {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String username = authentication.getName();
    String password = authentication.getCredentials().toString();

    User user = userRepository.findActiveByEmail(username).orElseThrow(() ->
            new UsernameNotFoundException("Active user not found with email: " + username));

    if (passwordEncoder.matches(password, user.getPassword())) {
      return new UsernamePasswordAuthenticationToken(user.getId(), password, getGrantedAuthorities(user.getRoles()));
    } else {
      throw new BadCredentialsException("Incorrect password for user: " + username);
    }
  }

  private List<GrantedAuthority> getGrantedAuthorities(Set<Role> authorities) {
    List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
    for (Role authority : authorities) {
      grantedAuthorities.add(new SimpleGrantedAuthority(authority.getName()));
    }
    return grantedAuthorities;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
  }

  public Authentication getSecurityContextAuthentication() {
    return SecurityContextHolder.getContext().getAuthentication();
  }

  public Long getAuthenticationPrincipal() {
    return Long.valueOf((String) getSecurityContextAuthentication().getPrincipal());
  }
}
