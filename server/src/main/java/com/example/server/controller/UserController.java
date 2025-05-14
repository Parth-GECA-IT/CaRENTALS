package com.example.server.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
