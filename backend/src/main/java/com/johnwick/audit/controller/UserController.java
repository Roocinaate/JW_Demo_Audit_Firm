package com.johnwick.audit.controller;

import com.johnwick.audit.dto.UserDTO;
import com.johnwick.audit.model.User; // Added import for User entity
import com.johnwick.audit.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Added import for List

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        UserDTO user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    // --- VULNERABLE ENDPOINT START ---
    @GetMapping("/unsafe-search")
    public List<User> unsafeSearch(@RequestParam String username) {
        // Calls the vulnerable service method
        return userService.searchUserVulnerable(username);
    }
    // --- VULNERABLE ENDPOINT END ---
}