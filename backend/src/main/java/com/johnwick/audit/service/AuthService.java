package com.johnwick.audit.service;

import com.johnwick.audit.config.JwtUtil;
import com.johnwick.audit.dto.LoginRequest;
import com.johnwick.audit.dto.LoginResponse;
import com.johnwick.audit.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    public AuthService(JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        
        // VULNERABLE QUERY construction
        String jql = "FROM User WHERE username = '" + request.getUsername() + "'";

        try {
            // Execute the query
            List<User> users = entityManager.createQuery(jql, User.class).getResultList();

            if (users.isEmpty()) {
                throw new RuntimeException("Invalid username or password");
            }

            User user = users.get(0);

            // --- THE FIX IS HERE ---
            
            // Scenario 1: NORMAL LOGIN ATTEMPT
            // If we found exactly 1 user AND the input username matches the database username exactly.
            // Then we MUST check the password.
            if (users.size() == 1 && user.getUsername().equals(request.getUsername())) {
                if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                    throw new RuntimeException("Invalid username or password");
                }
            }
            
            // Scenario 2: SQL INJECTION ATTACK
            // If the code reaches here, it means either:
            // A) The password was correct (from Scenario 1).
            // B) OR... It was an Injection! (users.size > 1 OR username mismatch).
            // In case B, we completely SKIPPED the password check block above.

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

            return new LoginResponse(
                token,
                user.getUsername(),
                user.getRole().name(),
                user.getFullName(),
                "Login successful"
            );

        } catch (Exception e) {
            // Ensure we catch the exception thrown in Scenario 1 and re-throw it or generic error
            if (e.getMessage().equals("Invalid username or password")) {
                throw new RuntimeException("Invalid username or password");
            }
            e.printStackTrace();
            throw new RuntimeException("Login failed");
        }
    }
}