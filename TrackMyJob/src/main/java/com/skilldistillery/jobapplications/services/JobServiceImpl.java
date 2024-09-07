package com.skilldistillery.jobapplications.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.jobapplications.entities.Job;
import com.skilldistillery.jobapplications.repositories.JobRepository;

@Service
public class JobServiceImpl implements JobService {
	
	@Autowired
	private JobRepository jobRepo;

	@Override
	public List<Job> getAllJobs() {
		
//		return jobRepo.findAll();
		return jobRepo.findByEnabledTrue();
	}

	@Override
	public Job showJob(int jobId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Job create(Job newJob) {
		newJob.setEnabled(true);
		return null;
	}

	@Override
	public Job update(int jobId, Job updatingJob) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int jobId) {
		// TODO Auto-generated method stub
		return false;
	}

}
