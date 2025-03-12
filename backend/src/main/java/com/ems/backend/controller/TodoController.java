package com.ems.backend.controller;

import com.ems.backend.dto.TodoDto;
import com.ems.backend.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
        return new ResponseEntity<>(todoService.addTodo(todoDto), HttpStatus.CREATED);
    }

    @PostMapping("/many")
    public ResponseEntity<List<TodoDto>> createManyTodos(@RequestBody List<TodoDto> todoDtoList) {
        return new ResponseEntity<>(todoService.createManyTodos(todoDtoList), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable("id") long id) {
        return ResponseEntity.ok(todoService.getTodo(id));
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") long id, @RequestBody TodoDto todoDto) {
        return ResponseEntity.ok(todoService.updateTodo(id, todoDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") long id) {
        todoService.deleteTodo(id);
        return new ResponseEntity<>("Todo deleted successfully id: " + id, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") long id) {
        return ResponseEntity.ok(todoService.completeTodo(id));
    }
}
