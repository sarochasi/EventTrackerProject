console.log('script.js loaded');

window.addEventListener('load', function(){
	console.log('DOM loaded');
	init();
});

function init(){
	loadAllJobs();
	
	//TODO -event listeners, etc.
}

function loadAllJobs(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/jobs');
	xhr.onreadystatechange = function(){
		if(xhr.readyState === xhr.DONE){
			if(xhr.status === 200){
				let jobs = JSON.parse(xhr.responseText);
				console.log(jobs);
				displayJobList(jobs);
			}else{
				//FIXME
			}
		}
	};
	
	xhr.send();
}

function displayJobList(jobList){
	let tbody = document.getElementById('jobListBody');
}