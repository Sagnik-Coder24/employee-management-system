package com.ems.backend.service;

import com.ems.backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    List<EmployeeDto> createManyEmployee(List<EmployeeDto> employeeDtoList);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployee();

    EmployeeDto updateEmployee(long empId, EmployeeDto updatedEmp);

    void deleteEmployee(long id);

}
