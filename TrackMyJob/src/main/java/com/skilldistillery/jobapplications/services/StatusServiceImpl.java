package com.skilldistillery.jobapplications.services;

import java.util.List;

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
	
}
