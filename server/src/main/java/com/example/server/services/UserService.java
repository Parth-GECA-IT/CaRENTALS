package com.example.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.requests.LoginRequest;
import com.example.server.requests.RegisterRequest;


@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public User register(RegisterRequest req) {
		User user = new User();
		
		user.setName(req.getName());
		user.setEmail(req.getEmail());
		user.setPassword(req.getPassword());
		user.setUsername(req.getUsername());
		user.setPhone(req.getPhone());
		return userRepository.save(user);
	}
	
	public String loginUser(LoginRequest loginRequest) {
		Optional<User> user = userRepository.findById(loginRequest.getUsername());
		
		if(user.isEmpty()) {
			return "User not found";
		}
		User user1 = user.get();
		if(user1.getPassword().equals(loginRequest.getPassword())) {
			return "Login successfully";
		}
		else {
			return "Invalid credentials";
		}
	}
}
