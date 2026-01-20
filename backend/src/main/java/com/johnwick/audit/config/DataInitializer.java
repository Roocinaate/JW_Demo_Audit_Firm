package com.johnwick.audit.config;

import com.johnwick.audit.model.OrganizationDetails;
import com.johnwick.audit.model.User;
import com.johnwick.audit.repository.OrganizationDetailsRepository;
import com.johnwick.audit.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final OrganizationDetailsRepository organizationDetailsRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataInitializer(UserRepository userRepository, 
                          OrganizationDetailsRepository organizationDetailsRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.organizationDetailsRepository = organizationDetailsRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) {
        // Initialize admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@johnwickaudit.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Admin User");
            admin.setRole(User.Role.ADMIN);
            admin.setPosition("Administrator");
            admin.setDepartment("Management");
            admin.setPhone("123-456-7890");
            userRepository.save(admin);
        }
        
        // Initialize organization details
        if (organizationDetailsRepository.count() == 0) {
            OrganizationDetails org = new OrganizationDetails();
            org.setCompanyName("John Wick Audit Firm");
            org.setDescription("A premier audit and accounting firm providing comprehensive financial services, audit solutions, and business consultancy. We ensure accuracy, compliance, and excellence in all our engagements.");
            org.setAddress("123 Business Street, Financial District, New York, NY 10001");
            org.setPhone("1-800-JOHN-WICK");
            org.setEmail("info@johnwickaudit.com");
            org.setEstablishedYear(2010);
            org.setTotalEmployees((int) userRepository.count());
            organizationDetailsRepository.save(org);
        }
    }
}
