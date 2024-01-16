package com.coyjiv.isocial.exceptions;

public class PasswordMatchException extends Exception {
  public PasswordMatchException(String errorMessage) {
    super(errorMessage);
  }
}
