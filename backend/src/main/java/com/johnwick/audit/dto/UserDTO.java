package com.johnwick.audit.dto;

import com.johnwick.audit.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private String position;
    private String department;
    private String phone;
    
    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.role = user.getRole().name();
        this.position = user.getPosition();
        this.department = user.getDepartment();
        this.phone = user.getPhone();
    }
}
