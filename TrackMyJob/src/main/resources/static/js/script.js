console.log('script.js loaded');

window.addEventListener('load', function() {
	console.log('DOM loaded');
	init();
});

function init() {
	loadAllJobs();

	//TODO -event listeners, etc.
	let newJobForm = document.forms['newJobForm'];
	if(newJobForm){
		newJobForm.submitJob.addEventListener('click', function(e) {

			e.preventDefault();
			let newJob = e.target.parentElement;
			let position = newJob.position.value;
			let company = newJob.company.value;
			let dateApplied = newJob.dateApplied.value;
			let updateDate = newJob.updateDate.value;
			let description = newJob.description.value;
			let note = newJob.note.value;
			let status = newJob.status.value;
			let onsiteRemote = newJob.onsiteRemote.value;

			console.log(position);
			console.log(company);
			console.log(dateApplied);
			console.log(updateDate);
			console.log(description);
			console.log(note);
			console.log(status);
			console.log(onsiteRemote);

			let jobObject = {
				position: position,
				company: company,
				dateApplied: dateApplied,
				updateDate: updateDate,
				description: description,
				note: note,
				status: status,
				onsiteRemote: onsiteRemote
			};
			console.log(jobObject);

			let jobObjectJson = JSON.stringify(jobObject);
			createNewJob(jobObjectJson);
		});
		}else{
			console.error('newJobForm not found in the DOM.');
		}
	
	
		
	let jobListLink = document.getElementById("goToList");
	jobListLink.addEventListener('click',function(){
		showJobsList();
	});	
		
	let addLink = document.getElementById("goToAdd");
	addLink.addEventListener('click',function(){
		showCreateJob();
	});	
		
}



function loadAllJobs() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/jobs');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let jobs = JSON.parse(xhr.responseText);
				console.log(jobs);
				displayJobList(jobs);
			} else {
				//FIXME
				console.error('Error loading jobs.');
				displayError("Error loading jobs.");
			}
		}
	};

	xhr.send();
}

function displayError(errorMessage) {
	let jobListDiv = document.getElementById('jobListDiv');
	jobListDiv.textContent = '';
	let errorElement = document.createElement('h3');
	errorElement.textContent = errorMessage;
	jobListDiv.appendChild(errorElement);
}

function displayJobList1(jobs) {
	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tr = document.createElement('tr');

	let nameHeader = document.createElement('th');
	nameHeader.textContent = 'Position';
	let abbrHeader = document.createElement('th');
	abbrHeader.textContent = 'Company'

	tr.appendChild(nameHeader);
	tr.appendChild(abbrHeader);

	thead.appendChild(tr);
	table.appendChild(thead);

	let tbody = document.createElement('tbody');


	jobs.forEach(function(job) {
		let trBody = document.createElement('tr');
		let tdPosition = document.createElement('td');
		let tdCompany = document.createElement('td');
		tdPosition.textContent = job.position;

		tdCompany.textContent = job.company;

		trBody.appendChild(tdPosition);

		trBody.appendChild(tdCompany);

		tbody.appendChild(trBody);

	});



	table.appendChild(tbody);

	document.body.appendChild(table);
}


function displayJobList(jobs) {
    let jobsDiv = document.getElementById('jobRow');
    jobsDiv.textContent = ''; 

    jobs.forEach(function(job) {
		
        let colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 mb-4';

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.width = '18rem';

        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        // Job position title
        let positionTitle = document.createElement('h5');
        positionTitle.className = 'card-title';
        positionTitle.textContent = job.position;

        // Job company text
        let companyText = document.createElement('p');
        companyText.className = 'card-text';
        companyText.innerHTML = `<strong>Company:</strong> ${job.company}`;

        // Create button group (view, edit, delete)
        let buttonGroupDiv = document.createElement('div');
        buttonGroupDiv.className = 'd-flex justify-content-center align-items-center';

        // View button with collapse functionality
        let viewButton = document.createElement('a');
        viewButton.className = 'btn btn-outline-info';
        viewButton.setAttribute('data-bs-toggle', 'collapse');
        viewButton.href = `#collapse${job.id}`;
        viewButton.setAttribute('role', 'button');
        viewButton.setAttribute('aria-expanded', 'false');
        viewButton.setAttribute('aria-controls', `collapse${job.id}`);
        viewButton.textContent = 'View';

        // Edit button form
        let editForm = document.createElement('form');
        editForm.action = 'updateWorkoutForm.do';
        editForm.method = 'GET';
        editForm.innerHTML = `<input type="hidden" name="jobId" value="${job.id}" />`;
        let editButton = document.createElement('button');
        editButton.type = 'submit';
        editButton.className = 'btn btn-outline-info';
        editButton.textContent = 'Edit';
        editForm.appendChild(editButton);

        // Delete button form
        let deleteForm = document.createElement('form');
        deleteForm.action = 'deleteWorkout.do';
        deleteForm.method = 'POST';
        deleteForm.innerHTML = `<input type="hidden" name="jobId" value="${job.id}" />`;
        let deleteButton = document.createElement('button');
        deleteButton.type = 'submit';
        deleteButton.className = 'btn btn-outline-info';
        deleteButton.textContent = 'Delete';
        deleteForm.appendChild(deleteButton);

        // Add buttons to the button group
        buttonGroupDiv.appendChild(viewButton);
        buttonGroupDiv.appendChild(editForm);
        buttonGroupDiv.appendChild(deleteForm);

        // Collapse section for job details
        let collapseDiv = document.createElement('div');
        collapseDiv.className = 'collapse mt-2';
        collapseDiv.id = `collapse${job.id}`;
        let collapseCard = document.createElement('div');
        collapseCard.className = 'card card-body';
        collapseCard.innerHTML = `<ul>
									<li>Date applied: ${new Date(job.dateApplied).toLocaleDateString()}</li>
									<li>Last updated: ${new Date(job.updateDate).toLocaleDateString()}</li>
									<li>Description: ${job.description}</li>
									<li>Note: ${job.note}</li>
									</ul>`; 

        collapseDiv.appendChild(collapseCard);

        cardBodyDiv.appendChild(positionTitle);
        cardBodyDiv.appendChild(companyText);
        cardBodyDiv.appendChild(buttonGroupDiv);
        cardBodyDiv.appendChild(collapseDiv);

        cardDiv.appendChild(cardBodyDiv);

        colDiv.appendChild(cardDiv);

        jobsDiv.appendChild(colDiv);
    });
}



function createNewJob(jobObjectJson){
	let xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/jobs', true);

		xhr.setRequestHeader("Content-type", "application/json");

		xhr.onreadystatechange = function() {
			if (xhr.readyState === xhr.DONE) {
				if (xhr.status === 200 || xhr.status == 201) {
					let data = JSON.parse(xhr.responseText);
					console.log(data);
				}
			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		};
		
		
		console.log("jobObjectJson in CreateNewFilm")
		console.log(jobObjectJson);
		
		xhr.send(jobObjectJson);
}



//===========================================================================================

function showJobsList(){
	let jobListDiv = document.getElementById('jobListDiv');
	let addNewJobListDiv = document.getElementById('addNewJobListDiv');
	jobListDiv.style.visibility = "visible";
	addNewJobListDiv.style.visibility = 'hidden';
}

function showCreateJob(){
	let jobListDiv = document.getElementById('jobListDiv');
	let addNewJobListDiv = document.getElementById('addNewJobListDiv');
	jobListDiv.style.visibility = "hidden";
	addNewJobListDiv.style.visibility = 'visible';
}