package com.skilldistillery.jobapplications.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.jobapplications.entities.Status;
import com.skilldistillery.jobapplications.repositories.StatusRepository;


@Service
public class StatusServiceImpl implements StatusService{
	
	@Autowired
	private StatusRepository statusRepo;

	@Override
	public List<Status> listAllStatus() {
		return statusRepo.findAll();
	}

	@Override
	public Status showStatus(int statusId) {
		Optional<Status> optStatus = statusRepo.findById(statusId);
		if(optStatus.isPresent()) {
			return optStatus.get();
		}
		return null;
	}
	
}
