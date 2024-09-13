console.log('script.js loaded');

window.addEventListener('load', function() {
	console.log('DOM loaded');
	init();
});

function init() {
	loadAllJobs();

	//TODO -event listeners, etc.
	
	document.newJobForm.submitJob.addEventListener('click', function(e) {

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
			createNewFilm(jobObjectJson);
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

function displayJobList(jobs) {
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

function displayJobList2(jobs) {
	let jobsDiv = document.getElementById('jobListDiv');
	jobsDiv.textContent = '';


	let jobDiv = document.getElementById('jobDiv');
	jobs.forEach(function(job) {
		let jobDetailDiv = document.getElementById('jobDetail');
		let position = document.getElementById('jobPosition');
		position.textContent = job.position;

		let company = document.getElementById('jobCompany');
		company.textContent = job.company;

		//let unOrderedList = document.getElementById('jobDetail');

		jobDetailDiv.appendChild(position);
		jobDetailDiv.appendChild(company);

		jobDiv.appendChild(jobDetailDiv);
	});
	jobsDiv.appendChild(jobDiv);



	document.body.appendChild(jobsDiv);


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