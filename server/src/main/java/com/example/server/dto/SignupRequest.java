package com.example.server.dto;

import lombok.Data;

@Data
public class SignupRequest {
	
	private String email;
	
	private String name;
	
	private String password;
	
	private String username;
	
	private String phone;
	
	private String cpass;

	public SignupRequest(String email, String name, String password, String username, String phone, String cpass) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
		this.username = username;
		this.phone = phone;
		this.cpass = cpass;
	}

	public SignupRequest() {
		super();
	}
	
}
