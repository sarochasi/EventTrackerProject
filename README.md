# EventTrackerProject

# TrackMyJob
## Overview

TrackMyJob is a web application designed to help users track thier job applications effiecielntly. The application allows users to create, update, delete, and view thier job applications, as well as manage different statuses and onsite/remote options. Built using Spring Boot and Spring Data JPA, TrackMyJob levereages RESTful services to provide a seamless user experience.

## REST Endpoints

| Return Type     | Route                 | Functionality            |
|-----------------|-----------------------|--------------------------|
| `List<User>`    |`GET api/users` | Retrieve a list of all users|
| `user` |`GET api/users/{username}`| Retrieve a user by username   |
| `user` |`POST api/users`| Create a new user   |
| `user` |`PUT api/users/{userId}`| Update a user by ID   |
| `void` |`DELETE api/users/{userId}`| Disable a user by ID   |
| `List<Job>`       |`GET api/jobs`| Retrieve a list of all jobs (enabled only) |
| `job`          |`GET /api/jobs/{jobId}`| Retrieve a job by ID|
| `job`    |`POST /api/jobs` | Create a new job|
| `job`    |`PUT /api/jobs/{jobId}` | Update a job by ID|
| `void`    |`DELETE /api/jobs/{jobId}`| Disable a job by ID|
| `List<job>`    |`GET statuses/{statusId}/jobs`| Get all jobs of a specific status|
| `List<job>`    |`GET onsiteremotes/{id}/jobs`| Get all jobs of a specific onsite/remote|

## Technologies Used

* Java: Programming language used for the application.
* Spring Boot: Framework for building the application and REST APIs.
* Spring Data JPA: Used for ORM and database operations.
* Hibernate: ORM implementation used by Spring Data JPA.
* MySQL: Database management system to store application data.
* JSON: Data format for sending and receiving data through REST APIs.

## Lesson Learned

* Understanding how to implement RESTful services using Spring Boot and Spring Data JPA significantly improved my knowledge of web application development.
* Gained practical experience in using annotations like @RestController, @RequestMapping, and @PathVariable to handle HTTP requests.
* Learned how to manage relationships between entities, such as User, Job, OnsiteRemote, and Status, using JPA annotations like @ManyToOne and @ManyToMany.