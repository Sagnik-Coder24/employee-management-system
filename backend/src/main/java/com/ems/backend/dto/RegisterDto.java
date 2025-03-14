package com.ems.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterDto {
    private String name;
    private String username;
    private String email;
    private String password;

}
