package com.example.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	@Id
	@Column(name = "username")
	private String username;

	@Column(name = "full_name")
	private String fullName;
	
	@Column(name = "email")
	private String email;	
	
	@Column(name = "password")
	private String password;	
	
	@Column(name = "phNumber")
	private String phoneNumber;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return fullName;
	}

	public void setName(String name) {
		this.fullName = name;
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

	public User(String email, String name, String password, String username, String phone) {
		super();
		this.email = email;
		this.fullName = name;
		this.password = password;
		this.username = username;
		this.phoneNumber = phone;

	}

	public User() {
		
	}
}
