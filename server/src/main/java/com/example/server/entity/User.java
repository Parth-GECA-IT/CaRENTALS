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
	private String name;
	
	@Column(name = "email")
	private String email;	
	
	@Column(name = "password")
	private String password;	
	
	@Column(name = "phNumber")
	private String phone;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public User(String email, String name, String password, String username, String phone) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
		this.username = username;
		this.phone = phone;

	}

	public User() {
		
	}
}
