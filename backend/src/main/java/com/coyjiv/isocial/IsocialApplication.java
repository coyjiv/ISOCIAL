package com.coyjiv.isocial;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;

@SpringBootApplication
public class IsocialApplication implements ApplicationRunner {
  public static void main(String[] args) {
    SpringApplication.run(IsocialApplication.class, args);
  }
  @Bean
  public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
    return factory -> {
      ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html");
      factory.addErrorPages(error404Page);
    };
  }


  @Override
  public void run(ApplicationArguments args) throws Exception {
    System.out.println("http://localhost:9000/swagger-ui/index.html");
    System.out.println("http://localhost:9000/h2-console");
  }
}
