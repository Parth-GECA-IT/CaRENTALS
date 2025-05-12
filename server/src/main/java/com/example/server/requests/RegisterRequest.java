package com.example.server.requests;

public class RegisterRequest {
	private String fullName;
	private String email;
	private String password;
	private String username;
	private String phoneNumber;
	
	public String getName() {
		return fullName;
	}
	public void setName(String name) {
		this.fullName = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phoneNumber;
	}
	public void setPhone(String phone) {
		this.phoneNumber = phone;
	}
	
	public RegisterRequest(String name, String email, String password, String username, String phone) {
		super();
		this.fullName = name;
		this.email = email;
		this.password = password;
		this.username = username;
		this.phoneNumber = phone;
	}
	public RegisterRequest() {
		super();
	}
}
