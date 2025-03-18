package com.ems.backend.service;

import com.ems.backend.dto.JwtAuthResponse;
import com.ems.backend.dto.LoginDto;
import com.ems.backend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);

    String getName(String usernameOrEmail);
}
