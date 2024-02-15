package com.coyjiv.isocial.auth;

import com.coyjiv.isocial.dao.UserRepository;
import com.coyjiv.isocial.domain.Role;
import com.coyjiv.isocial.domain.User;
import com.coyjiv.isocial.domain.UserActivityStatus;
import com.coyjiv.isocial.domain.UserGender;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DefaultAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

  private final UserRepository userRepository;
  private final JwtTokenProvider tokenProvider;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication)
          throws IOException, ServletException {
    OidcUser oauthUser = (OidcUser) authentication.getPrincipal();

    String firstName = oauthUser.getAttribute("given_name");
    String lastName = oauthUser.getAttribute("family_name");
    String email = oauthUser.getAttribute("email");

    if (!userRepository.existsUserByEmail(email)) {
      User user = new User();
      user.setFirstName(firstName);
      user.setLastName(lastName);
      user.setEmail(email);
      user.setActivityStatus(UserActivityStatus.OFFLINE);
      user.setGender(UserGender.NOT_SPECIFIED);
      user.setActive(true);
      Role userRole = new Role();
      userRole.setName("ROLE_USER");
      userRole.setUser(user);
      user.setRoles(Set.of(userRole));

      userRepository.save(user);
    }

    String access = tokenProvider.generateAccessToken(email, null);
    String refresh = tokenProvider.generateRefreshToken();

    String redirectUrl = String.format("/login?access=%s&refresh=%s", access, refresh);

    response.sendRedirect(redirectUrl);
  }
}
