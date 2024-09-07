package com.skilldistillery.jobapplications.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.jobapplications.entities.Job;
import com.skilldistillery.jobapplications.repositories.JobRepository;
import com.skilldistillery.jobapplications.repositories.StatusRepository;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepo;
	
	@Autowired
	private StatusRepository statusRepo;

	@Override
	public List<Job> getAllJobs() {

		return jobRepo.findByEnabledTrue();
	}

	@Override
	public Job showJob(int jobId) {

		Optional<Job> optJob = jobRepo.findById(jobId);
		if (optJob.isPresent() && optJob.get().getEnabled()) {
			return optJob.get();
		}
		return null;
	}

	@Override
	public Job create(Job newJob) {
		newJob.setEnabled(true);
		return jobRepo.saveAndFlush(newJob);

	}

	@Override
	public Job update(int jobId, Job updatingJob) {

		Optional<Job> optJob = jobRepo.findById(jobId);
		if(optJob.isPresent()) {
			Job managedJob = optJob.get();
			
			managedJob.setPosition(updatingJob.getPosition());
			managedJob.setCompany(updatingJob.getCompany());
			managedJob.setDateApplied(updatingJob.getDateApplied());
			managedJob.setDescription(updatingJob.getDescription());
			managedJob.setNote(updatingJob.getNote());
			managedJob.setStatus(updatingJob.getStatus());
			managedJob.setOnsiteRemote(updatingJob.getOnsiteRemote());
			
			return jobRepo.saveAndFlush(managedJob);
		}
		return null;
	}

	@Override
	public boolean delete(int jobId) {
		boolean deleted = false;

		Optional<Job> optJob = jobRepo.findById(jobId);

		if (optJob.isPresent()) {
			Job toDelete = optJob.get();
			toDelete.setEnabled(false);
			jobRepo.saveAndFlush(toDelete);

			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<Job> getJobsByStatus(int id) {
		if(!statusRepo.existsById(id)) {
			return null;
			
		}return jobRepo.findByStatusId(id);
	}

}
