package com.johnwick.audit.controller;

import com.johnwick.audit.model.OrganizationDetails;
import com.johnwick.audit.service.OrganizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organization")
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizationController {
    
    private final OrganizationService organizationService;
    
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }
    
    @GetMapping("/details")
    public ResponseEntity<OrganizationDetails> getOrganizationDetails() {
        OrganizationDetails details = organizationService.getOrganizationDetails();
        return ResponseEntity.ok(details);
    }
}
