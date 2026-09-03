package com.agented.controller;

import com.agented.model.User;
import com.agented.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import java.util.Map;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody(required = false) User user) {
        try {
            if (user == null) {
                throw new IllegalArgumentException("Registration payload cannot be empty.");
            }
            User registered = userService.registerUser(user);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "User registered successfully");
            response.put("user", registered);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody(required = false) Map<String, String> credentials) {
        if (credentials == null) credentials = new HashMap<>();
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOpt = userService.loginUser(email, password);
        if (userOpt.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Login successful");
            response.put("user", userOpt.get());
            response.put("token", "agented-jwt-token-" + System.currentTimeMillis());
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(error);
        }
    }
}
