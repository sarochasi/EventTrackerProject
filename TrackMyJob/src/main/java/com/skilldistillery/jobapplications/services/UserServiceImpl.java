package com.skilldistillery.jobapplications.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.jobapplications.entities.User;
import com.skilldistillery.jobapplications.repositories.UserRepository;

public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public User login(String username, String password) {
		return userRepo.findByUsernameAndPassword(username, password);
	}

	@Override
	public User findByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public User createUser(User user) {
		user.setEnabled(true);
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User updateUser(int userId, User updatingUser) {

		Optional<User> optUser = userRepo.findById(userId);
		if(optUser.isPresent()) {
			User managedUser = optUser.get();
			
			managedUser.setUsername(updatingUser.getUsername());
			managedUser.setPassword(updatingUser.getPassword());
			managedUser.setFirstName(updatingUser.getFirstName());
			managedUser.setLastName(updatingUser.getLastName());
			managedUser.setEmail(updatingUser.getEmail());
			managedUser.setJobs(updatingUser.getJobs());
			
			return userRepo.saveAndFlush(managedUser);
		}
		
		return null;
	}

	@Override
	public boolean deleteUser(int userId) {
		boolean deleted = false;
		
		Optional<User> optUser = userRepo.findById(userId);
		
		if(optUser.isPresent()){
			User toDelete = optUser.get();
			toDelete.setEnabled(false);
			userRepo.saveAndFlush(toDelete);
			
			deleted = true;
		}
		return deleted;
	}



}
