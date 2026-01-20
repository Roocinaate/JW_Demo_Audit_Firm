package com.johnwick.audit.service;

import com.johnwick.audit.model.OrganizationDetails;
import com.johnwick.audit.repository.OrganizationDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {
    
    private final OrganizationDetailsRepository organizationDetailsRepository;
    
    public OrganizationService(OrganizationDetailsRepository organizationDetailsRepository) {
        this.organizationDetailsRepository = organizationDetailsRepository;
    }
    
    public OrganizationDetails getOrganizationDetails() {
        List<OrganizationDetails> details = organizationDetailsRepository.findAll();
        if (details.isEmpty()) {
            OrganizationDetails org = new OrganizationDetails();
            org.setCompanyName("John Wick Audit Firm");
            org.setDescription("A premier audit and accounting firm providing comprehensive financial services.");
            return organizationDetailsRepository.save(org);
        }
        return details.get(0);
    }
}
