package com.skilldistillery.jobapplications.services;

import java.util.List;

import com.skilldistillery.jobapplications.entities.Job;

public interface JobService {
	
	List<Job> getAllJobs();
	
	Job showJob(int jobId);
	
	Job create(Job newJob);
	
	Job update(int jobId, Job updatingJob);
	
	boolean delete(int jobId);
	
	List<Job> getJobsByStatus(int id);

}
