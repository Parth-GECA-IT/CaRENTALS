package com.example.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
	    // Check if user already exists
	    if (userRepository.existsById(req.getUsername())) {
	        throw new IllegalArgumentException("Username already exists");
	    }

	    // Create and save user
	    User user = new User();
	    user.setFullName(req.getName());
	    user.setEmail(req.getEmail());
	    user.setPassword(req.getPassword());
	    user.setUsername(req.getUsername());
	    user.setPhone(req.getPhone());

	    return userRepository.save(user);
	}
	
	public User loginUser(LoginRequest loginRequest) throws UsernameNotFoundException, BadCredentialsException {
	    Optional<User> userOpt = userRepository.findById(loginRequest.getUsername());

	    if (userOpt.isEmpty()) {
	        throw new UsernameNotFoundException("User not found");
	    }

	    User user = userOpt.get();
	    if (!user.getPassword().equals(loginRequest.getPassword())) {
	        throw new BadCredentialsException("Invalid password");
	    }

	    user.setPassword(null); // never send passwords
	    return user;
	}
}
