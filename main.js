/*----------------Query Selectors---------------*/

var starredIdeas = document.querySelector('#sidebar-starred-ideas-btn');
var newQualityInput = document.querySelector('#new-quality');
var newQualityBtn = document.querySelector('#new-quality-btn');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var ideaArray = JSON.parse(localStorage.getItem('array')) || [];
var bottomSection = document.querySelector('.main__bottom-section');
var cards = document.querySelector('idea-card');

/*----------------Event Listeners---------------*/

newQualityBtn.addEventListener('click', function(){
})

saveBtn.addEventListener('click', function() {
	saveNewObject();
	clearInputs();
})

// cards.addEventListener('click', function(e) {
// 	if (e.target == document.querySelector('.card-header__delete-btn')) {
// 		console.log('button click');
// 	}
// });

if (ideaArray != []) {
	pageRefresh(ideaArray);
}


/*-----------------functions--------------------*/

function saveNewObject() {
	var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
	ideaArray.push(newIdea);



	newIdea.saveToStorage(ideaArray);
	addCard(newIdea);
}

function clearInputs() {
	titleInput.value = '';
	bodyInput.value = '';
}

function pageRefresh(ideaArray) {
	ideaArray.forEach((item) => {
		addCard(item);
	});
}




function addCard(idea) {
	
	bottomSection.innerHTML = 
	
	`<div class="idea-card" data-id="${idea.id}">
				<article class="idea-card__card-header">
					<button type="submit" class="card-header__star-btn"><img src="images/star.svg"></button>
					<button type="submit" class="card-header__delete-btn"><img src="images/delete.svg"></button>
				</article>
				<article class="idea-card__card-body">
					<h3  class="card-body__title">${idea.title}</h3>
					<p class="card-body__content">${idea.body}</p>
				</article>
				<article class=idea-card__card-footer>
					<button type="submit" class="card-footer__up-btn"><img src="images/upvote.svg"></button>
					<p>Quality: Swill</p>
					<button type="submit" class="card-footer__down-btn"><img src="images/downvote.svg"></button>
				</article>
			</div>
	`
	+ bottomSection.innerHTML ;

	var cardDeleteBtn = document.getElementsByClassName('card-header__delete-btn');

	for (var i = 0; i < cardDeleteBtn.length; i++) {
		cardDeleteBtn[i].addEventListener('click', function() {
			var parentEl = this.parentElement.parentElement;
			parentEl.style.display = 'none';

			 var elId = JSON.parse(parentEl.dataset.id);
						console.log(elId)
						findItem(elId)
		});
		
	}
}



function findItem(elId) {

	var itemsInLocalStorage = JSON.parse(localStorage.getItem('array'));

	var elIndex = itemsInLocalStorage.findIndex(function(element) {
		return element.id === elId;
	  });
	  
	  console.log((itemsInLocalStorage))
	  itemsInLocalStorage.splice(elIndex,1)
	  localStorage.clear();
	  localStorage.setItem('array', JSON.stringify(itemsInLocalStorage));
}

