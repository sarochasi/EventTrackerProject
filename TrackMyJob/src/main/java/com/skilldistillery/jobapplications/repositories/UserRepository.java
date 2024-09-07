package com.skilldistillery.jobapplications.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.jobapplications.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsernameAndPassword(String username, String password);

	User findByUsername(String username);
	
	List<User> findByEnabledTrue();
}
