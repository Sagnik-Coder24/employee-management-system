package com.ems.backend.service;

import com.ems.backend.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    
}
