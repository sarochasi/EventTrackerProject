package com.skilldistillery.jobapplications.services;

import com.skilldistillery.jobapplications.entities.User;

public interface UserService {
	User login(String username, String password);
	User findByUsername(String username);
    User createUser(User user);
    User updateUser(int userId, User user);
    boolean deleteUser(int userId);

}
