import { OnsiteRemote } from './../../models/onsite-remote';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job';
import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Status } from '../../models/status';

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
  statuses: Status[] = [];
  OnsiteRemotes: OnsiteRemote[] = [];
  newJob: Job = new Job();
  selected: Job | null = null;
  editJob: Job | null = null;
  showCreateForm: boolean = false;

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
        console.error('HomeComponent.reloadJobs: error retrieving list');
        console.error(fail);
      }
    });
  }

  loadStatuses(): void{
    this.jobService.getStatuses().subscribe(
      {
        next: (statusList) =>{
          this.statuses = statusList;
          console.log(this.statuses);
        },
        error: (fail) => {
          console.error('HomeComponent.loadStatuses: error loading statuses');
          console.error(fail);
        }
      }
    );
  }

  displayJob(job: Job): void{
    this.selected = job;
    console.log(this.selected);
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  createJob(): void{
    this.jobService.create(this.newJob).subscribe({
      next: (result) => {
        this.reloadJobs();
        this.toggleCreateForm();
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
      console.log(this.editJob);
    }
  }

  updateJob(job: Job, setSelected: boolean = true){
    console.log('Updating job:', job);

    this.jobService.update(job).subscribe(
      {
        next: (updatedJob) => {
          if(setSelected){
            this.selected = null;
            this.editJob = null;
            this.reloadJobs();

          }},
          error: (err) => {
            console.error('Error updating job', err);
          }
      });

  }

  deleteJob(jobId: number){
    this.jobService.destroy(jobId).subscribe(
      {
        next: () => {
          this.reloadJobs();
        },
        error: (fail) =>{
          console.log('JobListComponent.deteJob failed');
          console.error(fail);
        }
      }
    )
  }

}

//TODO detail div with selected job
//TODO form to create new job
//TODO update form
//TODO delete button - where ? in list or detail view?
//TODO Models for FormationType, CaveVisit, User
