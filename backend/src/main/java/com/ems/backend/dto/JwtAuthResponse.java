package com.ems.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;

    public JwtAuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public JwtAuthResponse(String s, String roleName) {
        this.accessToken = s;
        this.role = roleName;
    }
}
