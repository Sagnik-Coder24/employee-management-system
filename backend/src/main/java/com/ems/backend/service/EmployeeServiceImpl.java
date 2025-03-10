package com.ems.backend.service;

import com.ems.backend.dto.EmployeeDto;
import com.ems.backend.entity.Department;
import com.ems.backend.entity.Employee;
import com.ems.backend.exception.ResourceNotFoundException;
import com.ems.backend.mapper.EmployeeMapper;
import com.ems.backend.repository.DepartmentRepository;
import com.ems.backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(
                () -> new ResourceNotFoundException("Department not found with id: " + employeeDto.getDepartmentId())
        );

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        employee.setDepartment(department);
        Employee save = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(save);
    }

    @Override
    public List<EmployeeDto> createManyEmployee(List<EmployeeDto> employeeDtoList) {

        List<EmployeeDto> employeeDtos = new ArrayList<>();

        for (EmployeeDto employeeDto : employeeDtoList) {
            employeeDtos.add(createEmployee(employeeDto));
        }

        return employeeDtos;
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee not found with id: " + employeeId)
        );
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> all = employeeRepository.findAllByOrderByIdAsc();

        if (all.isEmpty()) {
            throw new ResourceNotFoundException("No employee found");
        }

        return all.stream().map(EmployeeMapper::mapToEmployeeDto).toList();
    }

    @Override
    public EmployeeDto updateEmployee(long empId, EmployeeDto updatedEmp) {
        employeeRepository.findById(empId).orElseThrow(
                () -> new ResourceNotFoundException("Employee not found with id: " + empId)
        );
        updatedEmp.setId(empId);
        return createEmployee(updatedEmp);
    }

    @Override
    public void deleteEmployee(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Employee not found with id: " + id)
        );

        employeeRepository.delete(employee);
    }
}




















