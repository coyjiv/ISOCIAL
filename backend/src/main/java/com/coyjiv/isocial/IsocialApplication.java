package com.coyjiv.isocial;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IsocialApplication implements ApplicationRunner {
  public static void main(String[] args) {
    System.out.println("Current DATABASE_URL: " + System.getenv("DATABASE_URL"));
    System.out.println("Current DATABASE_USERNAME: " + System.getenv("DATABASE_USERNAME"));
    System.out.println("Current DATABASE_PASSWORD: " + System.getenv("DATABASE_PASSWORD"));
    System.out.println("Current GOOGLE_OAUTH_CLIENT_ID: " + System.getenv("GOOGLE_OAUTH_CLIENT_ID"));
    System.out.println("Current GOOGLE_OAUTH_SECRET_KEY: " + System.getenv("GOOGLE_OAUTH_SECRET_KEY"));

    SpringApplication.run(IsocialApplication.class, args);
  }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    System.out.println("http://localhost:9000/swagger-ui/index.html");
    System.out.println("http://localhost:9000/h2-console");
  }
}
