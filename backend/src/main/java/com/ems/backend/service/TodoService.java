package com.ems.backend.service;

import com.ems.backend.dto.TodoDto;

import java.util.List;

public interface TodoService {

    TodoDto addTodo(TodoDto todoDto);

    List<TodoDto> createManyTodos(List<TodoDto> todoDtoList);

    TodoDto getTodo(Long id);

    List<TodoDto> getAllTodos();

    TodoDto updateTodo(long id, TodoDto todoDto);

    void deleteTodo(long id);

    TodoDto completeTodo(long id);
}