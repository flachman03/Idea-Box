/*----------------Query Selectors---------------*/

var starredIdeas = document.querySelector('#sidebar-starred-ideas-btn');
var newQualityInput = document.querySelector('#new-quality');
var newQualityBtn = document.querySelector('#new-quality-btn');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var ideaArray = [];
var bottomSection = document.querySelector('.bottom-section');

/*----------------Event Listeners---------------*/

newQualityBtn.addEventListener('click', function(){
})

saveBtn.addEventListener('click', function() {
	saveNewObject();
	clearInputs();
	addCard();
})


/*-----------------functions--------------------*/

function saveNewObject() {
	var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
	ideaArray.push(newIdea);
	console.log(ideaArray);
	var stringified = JSON.stringify(newIdea);
	localStorage.setItem(newIdea.id, stringified);
	console.log(localStorage);
}

function getObject(ideaArray) {
	ideaArray.forEach(function(item) {
	var storedIdea = localStorage.getItem(item.id);
	var parsed = JSON.parse(storedIdea);
	return parsed = new Idea(parsed.id, parsed.title, parsed.body);
	});
}

function clearInputs() {
	titleInput.value = '';
	bodyInput.value = '';
}

// getObject(localStorage);

function addCard() {
	bottomSection.innerHTML += 
	
	`<div class="idea-card">
				<article class="idea-card-header">
					<img src="images/star.svg">
					<img src="images/delete.svg">
				</article>
				<article class="idea-card-body">
					<h3 class="idea-card-title">${titleInput.value}</h3>
					<p class="idea-card-content">${bodyInput.value}</p>
				</article>
				<article class=idea-card-footer>
					<img src="images/upvote.svg">
					<p>Quality: Swill</p>
					<img src="images/downvote.svg">
				</article>
			</div>
	`
}

