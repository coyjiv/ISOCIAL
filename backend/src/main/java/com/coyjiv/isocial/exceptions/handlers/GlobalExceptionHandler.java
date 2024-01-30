package com.coyjiv.isocial.exceptions.handlers;


import com.coyjiv.isocial.exceptions.EntityNotFoundException;
import com.coyjiv.isocial.exceptions.RequestValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException exception) {
    List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();
    Map<String, String> errors = fieldErrors.stream()
            .filter(error -> error.getDefaultMessage() != null)
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
    return ResponseEntity.status(400).body(errors);
  }

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException exception) {
    return ResponseEntity.status(404).body(exception.getMessage());
  }

  @ExceptionHandler(IllegalAccessException.class)
  public ResponseEntity<?> handleIllegalAccessException(IllegalAccessException exception) {
    return ResponseEntity.status(403).body(exception.getMessage());
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
    return ResponseEntity.status(400).body(exception.getMessage());
  }

  @ExceptionHandler(RequestValidationException.class)
  public ResponseEntity<?> handleRequestValidationException(RequestValidationException exception) {
    return ResponseEntity.status(400).body(exception.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleUncheckedExceptions(Exception exception){
    return ResponseEntity.status(500).build();
  }


}
