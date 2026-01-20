package com.johnwick.audit.repository;

import com.johnwick.audit.model.OrganizationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationDetailsRepository extends JpaRepository<OrganizationDetails, Long> {
}
