/*----------------Query Selectors---------------*/

var starredIdeas = document.querySelector('#sidebar-starred-ideas-btn');
var newQualityInput = document.querySelector('#new-quality');
var newQualityBtn = document.querySelector('#new-quality-btn');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var bottomSection = document.querySelector('.main__bottom-section');
var cards = document.querySelector('idea-card');
var starBtn = document.querySelector('.card-header__star-btn');
var ideaArray = JSON.parse(localStorage.getItem('array'))|| [];
var qualityArray = ['Swill', 'Plausable', 'Genius']

/*----------------Event Listeners---------------*/

saveBtn.addEventListener('click', function(e) {
	saveNewObject(e);
	clearInputs();
})


bottomSection.addEventListener('click', function(e) {
			var idea = e.target.parentNode.parentNode.dataset.id;
		if (e.target.className.includes('card-header__star-btn')){
			changeStar(idea)
		 };
		if (e.target.className.includes('card-footer__up-btn')) {
			upvote(idea)
		};
		if (e.target.className.includes('card-footer__down-btn')) {
			downvote(idea)
		}
})

if (ideaArray.length != 0) {
	onLoad();
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
	ideaArray.forEach(function(item) {
		addCard(item);
	});
}




function addCard(idea) {
	
	bottomSection.innerHTML = 

	`<div class="idea-card" data-id="${idea.id}">
				<article class="idea-card__card-header">
					<img src=${idea.starImg} class="card-header__star-btn">
					<img src="images/delete.svg" class="card-header__delete-btn">
				</article>
				<article class="idea-card__card-body">
					<h3  class="card-body__title">${idea.title}</h3>
					<p class="card-body__content">${idea.body}</p>
				</article>
				<article class=idea-card__card-footer>
					<img src="images/upvote.svg" class="card-footer__up-btn">
					<p>Quality: ${qualityArray[idea.qualityCount]}</p>
					<img src="images/downvote.svg" class="card-footer__down-btn">
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


function onLoad() {
	var array = JSON.parse(localStorage.getItem('array'))
	var newArray = array.map(item => {
		item = new Idea(item.id, item.title, item.body, item.qualityCount)
		return item;
	})
	ideaArray = newArray;
}

function updatePage(newArray) {
			ideaArray = newArray
			ideaArray[0].saveToStorage(ideaArray);
			bottomSection.innerHTML = '';
			pageRefresh(ideaArray)
}

function upvote(idea) {
	var newArray = ideaArray.map(item => {
		if (item.id == idea) {
			item.updateQuality('upvote')
			}
			return item;
		})
	updatePage(newArray)
}

function downvote(idea) {
	var newArray = ideaArray.map(item => {
		if (item.id == idea) {
			item.updateQuality('downvote')
			}
		return item;
		})
	updatePage(newArray)
}

function changeStar(idea) {
	newArray = ideaArray.map(item => {
		if (item.id == idea) {
			item.starToggle();
		}
		return item;
	})
	updatePage(newArray)
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

