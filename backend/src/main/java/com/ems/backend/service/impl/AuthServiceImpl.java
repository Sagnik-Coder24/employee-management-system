package com.ems.backend.service.impl;

import com.ems.backend.config.JwtTokenProvider;
import com.ems.backend.dto.JwtAuthResponse;
import com.ems.backend.dto.LoginDto;
import com.ems.backend.dto.RegisterDto;
import com.ems.backend.entity.Role;
import com.ems.backend.entity.User;
import com.ems.backend.exception.ResourceNotFoundException;
import com.ems.backend.exception.TodoAPIException;
import com.ems.backend.repository.RoleRepository;
import com.ems.backend.repository.UserRepository;
import com.ems.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;


    @Override
    public String register(RegisterDto registerDto) {

        if (userRepository.existsByUsernameOrEmail(registerDto.getUsername(), registerDto.getEmail())) {
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username or email already exists");
        }

        User user = new User(
                null,
                registerDto.getName(),
                registerDto.getUsername(),
                registerDto.getEmail(),
                passwordEncoder.encode(registerDto.getPassword()),
                new HashSet<>(Set.of(roleRepository.findByName("ROLE_USER")))
        );

        userRepository.save(user);

        return "User registered successfully!";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authenticate);

        User user = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail()).orElseThrow(
                () -> new ResourceNotFoundException("User not found with username or email: " + loginDto.getUsernameOrEmail())
        );

        Optional<Role> optionalRole = user.getRoles().stream().findFirst();
        String roleName = null;

        if (optionalRole.isPresent()) {
            Role role = optionalRole.get();
            roleName = role.getName();
        }

        return new JwtAuthResponse(
                jwtTokenProvider.generateToken(authenticate),
                roleName
        );
    }

    @Override
    public String getName(String usernameOrEmail) {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail).orElseThrow(
                () -> new ResourceNotFoundException("User not found with username or email: " + usernameOrEmail)
        );
        return user.getName();
    }
}
