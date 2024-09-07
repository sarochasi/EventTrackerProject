package com.skilldistillery.jobapplications.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.jobapplications.entities.User;
import com.skilldistillery.jobapplications.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
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
	
	@PostMapping("users")
    public User createUser(@RequestBody User user, HttpServletRequest req, HttpServletResponse res) {
        try {
            user = userService.createUser(user);
            res.setStatus(201);
            StringBuffer url = req.getRequestURL();
            res.setHeader("Location", url.append("/").append(user.getId()).toString());
        } catch (Exception e) {
            res.setStatus(400);
            e.printStackTrace();
        }
        return user;
    }

    @PutMapping("users/{userId}")
    public User updateUser(@PathVariable int userId, @RequestBody User user, HttpServletResponse res) {
        try {
            user = userService.updateUser(userId, user);
            if (user == null) {
                res.setStatus(404);
            }
        } catch (Exception e) {
            res.setStatus(400);
            e.printStackTrace();
        }
        return user;
    }

    @DeleteMapping("users/{userId}")
    public void deleteUser(@PathVariable int userId, HttpServletResponse res) {
        if (userService.deleteUser(userId)) {
            res.setStatus(204);
        } else {
            res.setStatus(404);
        }
    }

}
