package com.ems.backend.controller;

import com.ems.backend.dto.JwtAuthResponse;
import com.ems.backend.dto.LoginDto;
import com.ems.backend.dto.RegisterDto;
import com.ems.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        return new ResponseEntity<>(authService.login(loginDto), HttpStatus.OK);
    }

    @PostMapping("/getName")
    public ResponseEntity<String> getName(@RequestBody String usernameOrEmail) {
        return ResponseEntity.ok(authService.getName(usernameOrEmail));
    }
}
