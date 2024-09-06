package com.skilldistillery.jobapplications.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "job")
public class Job {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String position;
	
	private String company;
	
	@CreationTimestamp
	@Column(name = "date_applied")
	private LocalDateTime dateApplied;
	
//	@UpdateTimestamp
//	@Column(name = "update_date")
//	private LocalDateTime updateDate;
	
	private String description;
	
	private Boolean enabled;

	public Job() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public LocalDateTime getDateApplied() {
		return dateApplied;
	}

	public void setDateApplied(LocalDateTime dateApplied) {
		this.dateApplied = dateApplied;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Job other = (Job) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Job [id=" + id + ", position=" + position + ", company=" + company + ", dateApplied=" + dateApplied
				+ ", description=" + description + ", enabled=" + enabled + "]";
	}
	
	

}
