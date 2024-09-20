import { CommonModule } from '@angular/common';
import { Job } from '../../../models/job';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  jobs: Job[] = [];
  newJob: Job = new Job();
  selected: Job | null = null;
  editJob: Job | null = null;

  constructor(
    private jobService: JobService
  ){}

  ngOnInit(): void {
    this.reloadJobs();
  }

  reloadJobs(): void{
    this.jobService.index().subscribe({
      next: (jobList) => {
        this.jobs = jobList;
      },
      error: (fail) => {
        console.error('HomwComponent.reloadJobs: error retrieving list');
        console.error(fail);
      }
    });
  }

  displayJob(job: Job): void{
    this.selected = job;
  }

  createJob(): void{
    this.jobService.create(this.newJob).subscribe({
      next: (result) => {
        this.reloadJobs();
        this.newJob = new Job();

      },
      error: (fail) =>{
        console.error('Error creating job', fail);
      }
    });
  }

  setEditJob(){
    if(this.selected){
      this.editJob = {...this.selected};
    }
  }

  updateJob(job: Job, setSelected: boolean = true){
    console.log('Updating job:', job);

    this.jobService.update(job).subscribe(
      {
        next: (updatedJob) => {
          if(setSelected){
            this.editJob = null;
            this.reloadJobs();
          }},
          error: (err) => {
            console.error('Error updating job', err);
          }
      });

  }

}

//TODO detail div with selected job
//TODO form to create new job
//TODO update form
//TODO delete button - where ? in list or detail view?
//TODO Models for FormationType, CaveVisit, User
