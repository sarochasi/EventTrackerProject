package com.skilldistillery.jobapplications.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.jobapplications.entities.User;
import com.skilldistillery.jobapplications.services.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("users/{username}")
	public User getUserByUsername(@PathVariable("username") String username, HttpServletResponse res) {
		
		User user = userService.findByUsername(username);
		if(user == null){
			res.setStatus(404);
		}
		return user;
	}

}
