package com.ems.backend.service;

import com.ems.backend.dto.TodoDto;
import com.ems.backend.entity.Todo;
import com.ems.backend.exception.ResourceNotFoundException;
import com.ems.backend.mapper.TodoMapper;
import com.ems.backend.repository.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;


    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = TodoMapper.mapToTodo(todoDto);
        Todo save = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(save);
    }

    @Override
    public List<TodoDto> createManyTodos(List<TodoDto> todoDtoList) {
        return todoDtoList.stream().map(this::addTodo).toList();
    }

    @Override
    public TodoDto getTodo(Long id) {
        return TodoMapper.mapToTodoDto(todoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Todo not found with id: " + id))
        );
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<Todo> all = todoRepository.findAllByOrderByIdAsc();
        return all.stream().map(TodoMapper::mapToTodoDto).toList();
    }

    @Override
    public TodoDto updateTodo(long id, TodoDto todoDto) {
        getTodo(id);
        Todo todo = TodoMapper.mapToTodo(todoDto);
        todo.setId(id);
        return TodoMapper.mapToTodoDto(todoRepository.save(todo));
    }

    @Override
    public void deleteTodo(long id) {
        TodoDto todo = getTodo(id);
        todoRepository.delete(TodoMapper.mapToTodo(todo));
    }

    @Override
    public TodoDto completeTodo(long id) {
        Todo todo = TodoMapper.mapToTodo(getTodo(id));
        todo.setCompleted(!todo.isCompleted());
        return TodoMapper.mapToTodoDto(todoRepository.save(todo));
    }
}
