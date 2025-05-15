package com.example.server.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.example.server.entity.User;
import com.example.server.requests.LoginRequest;
import com.example.server.requests.RegisterRequest;
import com.example.server.services.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	@PostMapping("/registerUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
	    try {
	        User savedUser = userService.register(request);
	        savedUser.setPassword(null);
	        return ResponseEntity.ok(savedUser);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Registration failed"));
	    }
	}
	
	@PostMapping("/loginUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
	    try {
	        User user = userService.loginUser(loginRequest);
	        return ResponseEntity.ok(user); // 200 OK
	    } catch (UsernameNotFoundException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(Map.of("error", e.getMessage()));
	    } catch (BadCredentialsException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("error", e.getMessage()));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("error", "An unexpected error occurred"));
	    }
	}
}
