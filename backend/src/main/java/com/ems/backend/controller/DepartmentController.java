package com.ems.backend.controller;

import com.ems.backend.dto.DepartmentDto;
import com.ems.backend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<DepartmentDto> createDept(@RequestBody DepartmentDto departmentDto) {
        DepartmentDto department = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    @PostMapping("/many")
    public ResponseEntity<List<DepartmentDto>> createManyDepartment(@RequestBody List<DepartmentDto> departmentDtoList) {
        List<DepartmentDto> departmentDtos = departmentService.createManyDepartments(departmentDtoList);
        return new ResponseEntity<>(departmentDtos, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDept(@PathVariable("id") long id) {
        DepartmentDto departmentDto = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(departmentDto);
    }

    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDept() {
        List<DepartmentDto> allDept = departmentService.getAllDepartments();
        return ResponseEntity.ok(allDept);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDto> updateDept(@PathVariable("id") long id, @RequestBody DepartmentDto updatedDept) {
        DepartmentDto departmentDto = departmentService.updateDepartment(id, updatedDept);
        return ResponseEntity.ok(departmentDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDept(@PathVariable("id") long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Deleted department: " + id);
    }
}
