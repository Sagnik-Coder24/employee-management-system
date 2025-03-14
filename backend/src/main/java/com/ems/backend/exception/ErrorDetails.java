package com.ems.backend.exception;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ErrorDetails {
    private LocalDateTime localDateTime;
    private String message;
    private String details;
}
