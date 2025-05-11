package com.example.server.requests;

public class RegisterRequest {
	private String name;
	private String email;
	private String password;
	private String username;
	private String phone;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public RegisterRequest(String name, String email, String password, String username, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.username = username;
		this.phone = phone;
	}
	public RegisterRequest() {
		super();
	}
}
