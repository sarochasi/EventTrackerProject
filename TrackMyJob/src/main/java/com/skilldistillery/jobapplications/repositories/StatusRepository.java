package com.skilldistillery.jobapplications.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.jobapplications.entities.Status;


public interface StatusRepository extends JpaRepository<Status, Integer> {

}
