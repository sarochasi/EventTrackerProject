package com.skilldistillery.jobapplications.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.jobapplications.entities.Job;
import com.skilldistillery.jobapplications.services.JobService;

@RestController
@RequestMapping("api")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	@GetMapping("jobs")
	public List<Job> getJobList(){
		return jobService.getAllJobs();
	}

}
