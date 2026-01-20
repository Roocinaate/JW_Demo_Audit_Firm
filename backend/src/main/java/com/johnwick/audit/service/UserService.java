package com.johnwick.audit.service;

import com.johnwick.audit.dto.UserCreateDTO;
import com.johnwick.audit.dto.UserDTO;
import com.johnwick.audit.model.User;
import com.johnwick.audit.repository.UserRepository;
import jakarta.persistence.EntityManager;      // Added
import jakarta.persistence.PersistenceContext; // Added
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext // Inject EntityManager to run raw queries
    private EntityManager entityManager;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // --- VULNERABLE METHOD START ---
    public List<User> searchUserVulnerable(String username) {
        // VULNERABILITY: Constructing the query using string concatenation
        String jql = "FROM User WHERE username = '" + username + "'";
        
        // This executes the query exactly as written, including any injected SQL
        return entityManager.createQuery(jql, User.class).getResultList();
    }
    // --- VULNERABLE METHOD END ---
    
    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);
    }
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(UserDTO::new)
            .collect(Collectors.toList());
    }
    
    public UserDTO createUser(UserCreateDTO userCreateDTO) {
        if (userRepository.existsByUsername(userCreateDTO.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(userCreateDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(userCreateDTO.getUsername());
        user.setEmail(userCreateDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        user.setFullName(userCreateDTO.getFullName());
        user.setRole(userCreateDTO.getRole() != null && userCreateDTO.getRole().equals("ADMIN") 
            ? User.Role.ADMIN : User.Role.USER);
        user.setPosition(userCreateDTO.getPosition());
        user.setDepartment(userCreateDTO.getDepartment());
        user.setPhone(userCreateDTO.getPhone());
        
        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser);
    }
    
    public UserDTO updateUser(Long id, UserCreateDTO userCreateDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.getUsername().equals(userCreateDTO.getUsername()) 
            && userRepository.existsByUsername(userCreateDTO.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (!user.getEmail().equals(userCreateDTO.getEmail()) 
            && userRepository.existsByEmail(userCreateDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setUsername(userCreateDTO.getUsername());
        user.setEmail(userCreateDTO.getEmail());
        if (userCreateDTO.getPassword() != null && !userCreateDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        }
        user.setFullName(userCreateDTO.getFullName());
        user.setRole(userCreateDTO.getRole() != null && userCreateDTO.getRole().equals("ADMIN") 
            ? User.Role.ADMIN : User.Role.USER);
        user.setPosition(userCreateDTO.getPosition());
        user.setDepartment(userCreateDTO.getDepartment());
        user.setPhone(userCreateDTO.getPhone());
        
        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}