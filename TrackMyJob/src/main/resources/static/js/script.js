
console.log('script.js loaded');

window.addEventListener('load', function() {
	console.log('DOM loaded');
	init();
});

function init() {
	loadAllJobs();

	//TODO -event listeners, etc.
	let newJobForm = document.forms['newJobForm'];
	if (newJobForm) {
		newJobForm.submitJob.addEventListener('click', function(e) {

			e.preventDefault();
			let newJob = e.target.parentElement;
			let position = newJob.position.value;
			let company = newJob.company.value;
			let dateApplied = newJob.dateApplied.value;

			let description = newJob.description.value;
			let note = newJob.note.value;


			console.log(position);
			console.log(company);
			console.log(dateApplied);

			console.log(description);
			console.log(note);


			let jobObject = {
				position: position,
				company: company,
				dateApplied: dateApplied,

				description: description,
				note: note,

			};
			console.log(jobObject);

			let jobObjectJson = JSON.stringify(jobObject);
			createNewJob(jobObjectJson);
			hideNewForm()
		});
	} else {
		console.error('newJobForm not found in the DOM.');
	}

	let addLink = document.getElementById("createNewJobButton");
	addLink.addEventListener('click',function(){
		showNewForm();
	});
	
	

function showNewForm() {
	let addNewJobListDiv = document.getElementById('addNewJobListDiv');
	let createNewJobButton = document.getElementById('createNewJobButton');
	
	addNewJobListDiv.style.display = 'block'; 
	createNewJobButton.style.display = 'none'; 
}

function hideNewForm() {
	let addNewJobListDiv = document.getElementById('addNewJobListDiv');
	let createNewJobButton = document.getElementById('createNewJobButton');
	
	addNewJobListDiv.style.display = 'none'; 
	createNewJobButton.style.display = 'block'; 
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

function displayJobList(jobs) {
	let tableContainer = document.getElementById('jobTableDiv');
	tableContainer.innerHTML = '';

	let table = document.createElement('table');
	table.classList.add('table', 'table-striped', 'table-hover');
	let thead = document.createElement('thead');
	let tr = document.createElement('tr');

	let positionHeader = document.createElement('th');
	positionHeader.textContent = 'Position';
	let companyHeader = document.createElement('th');
	companyHeader.textContent = 'Company'
	let dateAppliedHeader = document.createElement('th');
	dateAppliedHeader.textContent = 'dateApplied'
	let updateDateHeader = document.createElement('th');
	updateDateHeader.textContent = 'updateDate'
	let descriptionHeader = document.createElement('th');
	descriptionHeader.textContent = 'description'
	let noteHeader = document.createElement('th');
	noteHeader.textContent = 'note'
	let statusHeader = document.createElement('th');
	statusHeader.textContent = 'status'
	let onsiteRemoteHeader = document.createElement('th');
	onsiteRemoteHeader.textContent = 'Onsite/Remote'
	let actionHeader = document.createElement('th');
	actionHeader.textContent = ''



	tr.appendChild(positionHeader);
	tr.appendChild(companyHeader);
	tr.appendChild(dateAppliedHeader);
	tr.appendChild(updateDateHeader);
	tr.appendChild(descriptionHeader);
	tr.appendChild(noteHeader);
	tr.appendChild(statusHeader);
	tr.appendChild(onsiteRemoteHeader);
	tr.appendChild(actionHeader);

	thead.appendChild(tr);
	table.appendChild(thead);

	let tbody = document.createElement('tbody');


	jobs.forEach(function(job) {

		if (job.enabled === true) {
			let trBody = document.createElement('tr');
			let tdPosition = document.createElement('td');
			let tdCompany = document.createElement('td');
			let tdDateApplied = document.createElement('td');
			let updatedDate = document.createElement('td');
			let description = document.createElement('td');
			let note = document.createElement('td');
			let status = document.createElement('td');
			let onsiteRemote = document.createElement('td');

			let tdActions = document.createElement('td');
			let editButton = document.createElement('button');
			let deleteButton = document.createElement('button');


			tdPosition.textContent = job.position;
			tdCompany.textContent = job.company;
			tdDateApplied.textContent = job.dateApplied;
			updatedDate.textContent = job.updateDate;
			description.textContent = job.description;
			note.textContent = job.note;
			status.textContent = job.status ? job.status.status : "No status";
			onsiteRemote.textContent = job.onsiteRemote ? job.onsiteRemote.name : "N/A";

			editButton.textContent = "Edit";
			editButton.classList.add("btn", "btn-warning", "me-2");
			editButton.addEventListener('click', function() {

				editJob(job);
			});


			deleteButton.textContent = "Delete";
			deleteButton.classList.add("btn", "btn-danger");
			deleteButton.addEventListener('click', function() {

				disableJob(job.id);
				trBody.remove();

			});

			tdActions.appendChild(editButton);
			tdActions.appendChild(deleteButton);

			trBody.appendChild(tdPosition);

			trBody.appendChild(tdCompany);
			trBody.appendChild(tdDateApplied);
			trBody.appendChild(updatedDate);
			trBody.appendChild(description);
			trBody.appendChild(note);
			trBody.appendChild(status);
			trBody.appendChild(onsiteRemote);
			trBody.appendChild(tdActions);

			tbody.appendChild(trBody);

		}

		table.appendChild(tbody);
		tableContainer.appendChild(table);
		//document.body.appendChild(table);
	});

}


function createNewJob(jobObjectJson) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/jobs', true);

	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200 || xhr.status == 201) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);

				loadAllJobs();
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

function disableJob(jobId) {
	console.log("Disabling job with ID: " + jobId);

	let xhr = new XMLHttpRequest();

	xhr.open('DELETE', 'api/jobs/' + jobId, true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let data = xhr.responseText;
				let job = JSON.parse(data);
				console.log("Job disabled: " + job);


				loadAllJobs();



			} else {
				console.log("Error deleting " + jobId + ' : ' + xhr.status);
				displayError('Cannot delete job.')
			}
		}
	}
	xhr.send(JSON.stringify({ enabled: false }));

}

function editJob(jobObjectJson){
	console.log("Editing job " + jobObjectJson);
	let xhr = new XMLHttpRequest();

		xhr.open('PUT', 'api/jobs/' + jobId, true);

		xhr.setRequestHeader("Content-type", "application/json");

		xhr.onreadystatechange = function() {
			if (xhr.readyState === xhr.DONE) {
				if (xhr.status === 200) {
					let data = xhr.responseText;
					let job = JSON.parse(data);
					console.log("Job edited: " + job);


					loadAllJobs();



				} else {
					console.log("Error editing " + jobId + ' : ' + xhr.status);
					displayError('Cannot edit job.')
				}
			}
		}
		xhr.send(jobObjectJson);

}}