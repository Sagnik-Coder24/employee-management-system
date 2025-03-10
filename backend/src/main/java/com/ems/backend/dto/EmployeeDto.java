package com.ems.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long departmentId;
}
