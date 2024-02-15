package com.coyjiv.isocial.service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

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

  public void sendHtmlMessageWithParams(String to, String subject, String htmlBody, Map<String, String> params)
    throws MessagingException, MessagingException {
    MimeMessage message = emailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
    helper.setTo(to);
    helper.setSubject(subject);

    // Replace placeholders with actual parameters
    String processedHtmlBody = htmlBody;
    for (Map.Entry<String, String> entry : params.entrySet()) {
      processedHtmlBody = processedHtmlBody.replace("{{" + entry.getKey() + "}}", entry.getValue());
    }

    helper.setText(processedHtmlBody, true);
    emailSender.send(message);
  }

}
