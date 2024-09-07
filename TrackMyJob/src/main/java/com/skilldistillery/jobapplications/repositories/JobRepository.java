package com.skilldistillery.jobapplications.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.jobapplications.entities.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {

	List<Job> findByEnabledTrue();
	
}
