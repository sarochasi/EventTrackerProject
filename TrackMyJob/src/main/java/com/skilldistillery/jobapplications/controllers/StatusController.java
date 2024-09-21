package com.skilldistillery.jobapplications.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.jobapplications.entities.Status;
import com.skilldistillery.jobapplications.services.StatusService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class StatusController {
	
	@Autowired
	private StatusService statusService;
	
	
	@GetMapping({"statuses", "statuses/"})
	public List<Status> index(){
		return statusService.listAllStatus();
	}
	
}
