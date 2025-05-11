package com.example.server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	public ResponseEntity<User> register(@RequestBody RegisterRequest request){
		User savedUser = userService.register(request);
		return ResponseEntity.ok(savedUser);
	}
	
	@PostMapping("/loginUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest){
		String responseMessage = userService.loginUser(loginRequest);
		return ResponseEntity.ok(responseMessage);
	}
}
