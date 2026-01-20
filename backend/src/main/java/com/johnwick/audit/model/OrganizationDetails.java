package com.johnwick.audit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "organization_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String companyName = "John Wick Audit Firm";
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String address;
    private String phone;
    private String email;
    private Integer establishedYear;
    private Integer totalEmployees = 0;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
