/*----------------Query Selectors---------------*/

var starredIdeas = document.querySelector('#sidebar-starred-ideas-btn');
var newQualityInput = document.querySelector('#new-quality');
var newQualityBtn = document.querySelector('#new-quality-btn');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');

/*----------------Event Listeners---------------*/

newQualityBtn.addEventListener('click', function(){
})

saveBtn.addEventListener('click', function() {
	saveNewObject();
	clearInputs();
})


/*-----------------functions--------------------*/

function saveNewObject() {
	var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
	var stringified = JSON.stringify(newIdea);
	localStorage.setItem(newIdea.id, stringified);
	console.log(localStorage);
}

function getObject(idea) {
	var storedIdea = localStorage.getItem(idea.id);
	var parsed = JSON.parse(storedIdea);
	return parsed = new Idea(parsed.id, parsed.title, parsed.body);
}

function clearInputs() {
	titleInput.value = '';
	bodyInput.value = '';
}