package com.skilldistillery.jobapplications.entities;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class StatusTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Status status;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAJobApplication");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		status = em.find(Status.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		status = null;
	}

	@Test
	void test_Status_entity_Mapping() {
		assertNotNull(status);
		assertEquals("Not applied yet", status.getStatus());
	}
	
	@Test
	void test_Status_Job_OneToMany_Mapping() {
		assertNotNull(status.getJobs());
		assertTrue(status.getJobs().size() > 0);;
	}

}
