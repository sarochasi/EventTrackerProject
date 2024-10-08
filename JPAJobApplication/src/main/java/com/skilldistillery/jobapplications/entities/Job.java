
package com.skilldistillery.jobapplications.entities;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	private LocalDate dateApplied;
	
	@UpdateTimestamp
	@Column(name = "date_updated")
	private LocalDate updateDate;
	
	private String description;
	
	private Boolean enabled;
	
	private String note;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name ="status_id")
	private Status status;
	
	@ManyToOne
	@JoinColumn(name="onsite_remote_id")
	private OnsiteRemote onsiteRemote;

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

	public LocalDate getDateApplied() {
		return dateApplied;
	}

	public void setDateApplied(LocalDate dateApplied) {
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

	public LocalDate getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(LocalDate updateDate) {
		this.updateDate = updateDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	public OnsiteRemote getOnsiteRemote() {
		return onsiteRemote;
	}

	public void setOnsiteRemote(OnsiteRemote onsiteRemote) {
		this.onsiteRemote = onsiteRemote;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
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
				+ ", updateDate=" + updateDate + ", description=" + description + ", enabled=" + enabled + ", note="
				+ note + ", user=" + user + ", status=" + status + ", onsiteRemote=" + onsiteRemote + "]";
	}


	

}
