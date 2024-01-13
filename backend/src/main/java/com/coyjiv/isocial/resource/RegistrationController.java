package com.coyjiv.isocial.resource;

import com.coyjiv.isocial.dto.request.RegistrationRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody @Valid RegistrationRequestDTO requestDTO) {
    return ResponseEntity.ok(requestDTO);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException e) {
    List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
    Map<String, String> errors = fieldErrors.stream()
            .filter(error -> error.getDefaultMessage() != null)
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
    return ResponseEntity.status(400).body(errors);
  }

}
