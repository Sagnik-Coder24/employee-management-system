package com.ems.backend.service;

import com.ems.backend.dto.LoginDto;
import com.ems.backend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);

    String getName(String usernameOrEmail);
}
