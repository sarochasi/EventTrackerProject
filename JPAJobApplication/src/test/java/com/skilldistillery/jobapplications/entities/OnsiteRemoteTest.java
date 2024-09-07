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

class OnsiteRemoteTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private OnsiteRemote job;

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
		job = em.find(OnsiteRemote.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		job = null;
	}

	@Test
	void test_OnsiteRemote_entity_Mapping() {
		assertNotNull(job);
		assertEquals("Onsite", job.getName());
	}
	
	@Test
	void test_OnsiteRemote_Job_OneToMany_Mapping() {
		assertNotNull(job.getJobs());
		assertTrue(job.getJobs().size() > 0);;
	}

}
