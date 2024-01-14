package com.coyjiv.isocial;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IsocialApplication implements ApplicationRunner {
  public static void main(String[] args) {
    SpringApplication.run(IsocialApplication.class, args);
  }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    System.out.println("http://localhost:9000/swagger-ui/index.html");
    System.out.println("http://localhost:9000/h2-console");
  }
}
