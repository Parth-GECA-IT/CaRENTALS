package com.example.server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.requests.LoginRequest;
import com.example.server.requests.RegisterRequest;
import com.example.server.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	private UserRepository userRepository;
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
	
	@GetMapping("/logprocess")
	public String login(@RequestParam("uemail")String email,@RequestParam("upass")String pass, HttpSession session, ModelMap model) {
		User u = null;
		 u = userRepository.findByEmailAndPassword(email, pass);
		 if(u != null) {
			 session.setAttribute("data", email);
			 return "index";
		 }
		 else {
			 model.put("msg","Wrong Credentials! Please Try Again...");
			 return "login";
		 }
	}
	
	@GetMapping("/destroy")
	public String destroy(HttpServletRequest request) {
		request.getSession().invalidate();
		return "home";
	}
}
