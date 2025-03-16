package com.ems.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TodoAPIException.class)
    public ResponseEntity<ErrorDetails> handleTodoAPIException(TodoAPIException todoAPIException, WebRequest webRequest) {
        return new ResponseEntity<>(
                new ErrorDetails(
                        LocalDateTime.now(),
                        todoAPIException.getMessage(),
                        webRequest.getDescription(false)
                ),
                todoAPIException.getHttpStatus()
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException resourceNotFoundException, WebRequest webRequest) {
        return new ResponseEntity<>(
                new ErrorDetails(
                        LocalDateTime.now(),
                        resourceNotFoundException.getMessage(),
                        webRequest.getDescription(false)
                ),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception exception, WebRequest webRequest) {
        return new ResponseEntity<>(
                new ErrorDetails(
                        LocalDateTime.now(),
                        exception.getMessage(),
                        webRequest.getDescription(false)
                ),
                HttpStatus.BAD_REQUEST
        );
    }

}
