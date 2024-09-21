import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Job } from '../models/job';
import { Status } from '../models/status';


@Injectable({
  providedIn: 'root'
})
export class JobService {



  url = environment.baseUrl + "api/jobs";
  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('JobService.index(): error retrieving jobs', err);
        return throwError(
          () => new Error('JobService.index(): error retrieving jobbs')
        );
      })
    );
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(environment.baseUrl + 'api/statuses').pipe(
      catchError((err: any) => {
        console.error('JobService.getStatuses(): error retrieving statuses', err);
        return throwError(
          () => new Error('JobService.getStatuses(): error retrieving statuses')
        );
      })
    );
  }

  create(job: Job): Observable<Job>{
    return this.http.post<Job>(this.url, job).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('JobService.create(): error creating job')
        );
      })
    );
  }

  update(updateJob: Job): Observable<Job>{
    console.log(updateJob);
    return this.http.put<Job>(`${this.url}/${updateJob.id}`, updateJob).pipe(
      catchError((err: any) => {
        console.log('JobService.update(): error updating job', err);
        return throwError(
          () => new Error('JobService.update(): error updating job: ' + err)
        );
      })
    );
  }

  destroy(id: number){
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(
        (err:any) => {
          console.error('JobService.destroy(): errror deleteing job', err);
          return throwError(
            () => new Error('JobService.destroy(): error deleting job: ' + err)
          );
        }
      )
    );
  }


}
