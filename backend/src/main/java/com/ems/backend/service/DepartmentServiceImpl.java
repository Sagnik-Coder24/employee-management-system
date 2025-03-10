package com.ems.backend.service;

import com.ems.backend.dto.DepartmentDto;
import com.ems.backend.entity.Department;
import com.ems.backend.exception.ResourceNotFoundException;
import com.ems.backend.mapper.DepartmentMapper;
import com.ems.backend.repository.DepartmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department save = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(save);
    }

    @Override
    public List<DepartmentDto> createManyDepartments(List<DepartmentDto> departmentDtoList) {
        return departmentDtoList.stream().map(this::createDepartment).toList();
    }

    @Override
    public DepartmentDto getDepartmentById(long id) {
        return DepartmentMapper.mapToDepartmentDto(departmentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Department not found with id: " + id))
        );
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departmentList = departmentRepository.findAllByOrderByIdAsc();
        return departmentList.stream().map(DepartmentMapper::mapToDepartmentDto).toList();
    }

    @Override
    public DepartmentDto updateDepartment(long id, DepartmentDto departmentDto) {
        getDepartmentById(id);
        departmentDto.setId(id);
        return createDepartment(departmentDto);
    }

    @Override
    public void deleteDepartment(long id) {
        DepartmentDto departmentDto = getDepartmentById(id);
        departmentRepository.delete(DepartmentMapper.mapToDepartment(departmentDto));
    }
}
