package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	public User findByEmailAndPassword(String email, String pass);
}
