package com.coyjiv.isocial.service.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl {
  private final JavaMailSender emailSender;


  public void sendSimpleMessage(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    emailSender.send(message);
  }

  public void sendPasswordResetMessage(String to, String uuid) {
    SimpleMailMessage message = new SimpleMailMessage();

    String subject = "Password Reset";
    String resetUrl = "http://localhost:9000/forgotPassword?id=UUID" + uuid;
    String text = "To reset your password, please follow this link: " + resetUrl;


    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    emailSender.send(message);
  }

}
