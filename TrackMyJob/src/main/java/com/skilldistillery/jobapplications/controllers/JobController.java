package com.skilldistillery.jobapplications.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.jobapplications.entities.Job;
import com.skilldistillery.jobapplications.services.JobService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	@GetMapping("jobs")
	public List<Job> getJobList(){
		return jobService.getAllJobs();
	}
	
	@GetMapping("jobs/{jobId}")
	public Job showById(@PathVariable("jobId") int id, HttpServletResponse res) {
		
		Job job = jobService.showJob(id);
		if(job == null) {
			res.setStatus(404);
		}
		return job;
	}
	
	@PostMapping({"jobs","jobs/"})
	private Job createJob(@RequestBody Job job, HttpServletResponse res, HttpServletRequest req) {
		try {
			job = jobService.create(job);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			res.setHeader("Location", url.append("/").append(job.getId()).toString());
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			job = null;
		}
		return job;
	}
	
	@PutMapping("jobs/{jobId}")
	public Job updateJob(@PathVariable("jobId") Integer jobId, 
			@RequestBody Job job, HttpServletResponse res) {
		try {
			job = jobService.update(jobId, job);
			if(job == null){
				res.setStatus(404);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			job =null;
		}
		return job;
	}

}
