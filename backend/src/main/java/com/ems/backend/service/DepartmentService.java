package com.ems.backend.service;

import com.ems.backend.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {

    DepartmentDto createDepartment(DepartmentDto departmentDto);

    List<DepartmentDto> createManyDepartments(List<DepartmentDto> departmentDtoList);

    DepartmentDto getDepartmentById(long id);

    List<DepartmentDto> getAllDepartments();

    DepartmentDto updateDepartment(long id, DepartmentDto departmentDto);

    void deleteDepartment(long id);
}
