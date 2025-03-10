package com.ems.backend.controller;

import com.ems.backend.dto.EmployeeDto;
import com.ems.backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto employee = employeeService.createEmployee(employeeDto);

        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @PostMapping("/many")
    public ResponseEntity<List<EmployeeDto>> createManyEmployee(@RequestBody List<EmployeeDto> employeeDtoList) {

        List<EmployeeDto> manyEmployee = employeeService.createManyEmployee(employeeDtoList);

        return new ResponseEntity<>(manyEmployee, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") long id) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployee() {
        List<EmployeeDto> allEmployee = employeeService.getAllEmployee();
        return ResponseEntity.ok(allEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") long id, @RequestBody EmployeeDto updatedEmp) {
        EmployeeDto employeeDto = employeeService.updateEmployee(id, updatedEmp);
        return ResponseEntity.ok(employeeDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id) {
        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Deleted employee: " + id);
    }

}
