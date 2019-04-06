/*----------------Query Selectors---------------*/

var starredIdeas = document.querySelector('#sidebar-starred-ideas-btn');
var newQualityInput = document.querySelector('#new-quality');
var newQualityBtn = document.querySelector('#new-quality-btn');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var bottomSection = document.querySelector('.main__bottom-section');
var cards = document.querySelector('idea-card');
// var starBtn = document.querySelector('.card-header__star-btn');
var ideaArray = JSON.parse(localStorage.getItem('array'))|| [];
var qualityArray = ['Swill', 'Plausable', 'Genius'];
var mainTopSection = document.querySelector('.main__top-section');
/*----------------Event Listeners---------------*/

saveBtn.addEventListener('click', function(e) {

	if (titleInput.value === "" || bodyInput.value === "") {
		alert('Please add both title and body!')
	} else {
		saveNewObject(e);
	    clearInputs();
	}
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
					<h3  maxlength="16" contenteditable="true" class="card-body__title">${idea.title}</h3>
					<p contenteditable="true" class="card-body__content">${idea.body}</p>
				</article>
				<article class=idea-card__card-footer>
					<img src="images/upvote.svg" class="card-footer__up-btn">
					<p>Quality: ${qualityArray[idea.qualityCount]}</p>
					<img src="images/downvote.svg" class="card-footer__down-btn">
				</article>
			</div>
	`
	+ bottomSection.innerHTML ;

	
}

// deleting items start here..

bottomSection.addEventListener('click',  function(e) {
	
   if (e.target.className.includes('card-header__delete-btn')){
	var parentEl = e.target.parentNode.parentNode;
	var elId = JSON.parse(e.target.parentNode.parentNode.dataset.id);
	parentEl.style.display = 'none';
	deleteItemInStorage(elId)
    } 
});

function deleteItemInStorage(elId) {
	var itemsInLocalStorage = JSON.parse(localStorage.getItem('array'));
	for (var i = 0; i < itemsInLocalStorage.length; i++) {
		if(itemsInLocalStorage[i].id === elId) {
			  itemsInLocalStorage.splice(i,1);
			  localStorage.removeItem('array');
			  localStorage.setItem('array', JSON.stringify(itemsInLocalStorage));
		}
	}
}

// editning title ..

bottomSection.addEventListener('focusout',  function(e) {

	if (e.target.className.includes('card-body__content')){
		var itemsInLocalStorage = JSON.parse(localStorage.getItem('array'));
		var parentEl = e.target.parentNode.parentNode;
		var elId = JSON.parse(parentEl.dataset.id);

	 	for (var i = 0; i < itemsInLocalStorage.length; i++) {
			if(itemsInLocalStorage[i].id === elId) {
				var targetedIdea = itemsInLocalStorage[i];
				targetedIdea.body = e.target.textContent;

				itemsInLocalStorage.splice(i,1, targetedIdea);
				localStorage.removeItem('array');
			    localStorage.setItem('array', JSON.stringify(itemsInLocalStorage));
			}
		}
	}
 });

 // editing body ....

 bottomSection.addEventListener('focusout',  function(e) {

	if (e.target.className.includes('card-body__title')){
		var itemsInLocalStorage = JSON.parse(localStorage.getItem('array'));
		var parentEl = e.target.parentNode.parentNode;
		var elId = JSON.parse(parentEl.dataset.id);

	 	for (var i = 0; i < itemsInLocalStorage.length; i++) {
			if(itemsInLocalStorage[i].id === elId) {
				var targetedIdea = itemsInLocalStorage[i];
				targetedIdea.title = e.target.textContent;

				itemsInLocalStorage.splice(i,1, targetedIdea);
				localStorage.removeItem('array');
			    localStorage.setItem('array', JSON.stringify(itemsInLocalStorage));
			}
		}
	}
 });




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

// charecter counter..

mainTopSection.addEventListener('keyup', function(e) {
	
	if (e.target.className.includes('idea-form__title-input')) {
		var inputType = 'title';
		var titleInputValue = 32;
		charCounter(titleInput.value, inputType, titleInputValue);
	}

});

mainTopSection.addEventListener('keyup', function(e) {
	
	if (e.target.className.includes('idea-form__body-input')) {
		var inputType = 'body';
		var bodyInputValue = 50;
		charCounter(titleInput.value, inputType, bodyInputValue);
	}
});


function charCounter(value, inputType, inputCharValue) {
	var titleInputCharCounter = document.querySelector('.title-input-char-counter');
	var bodyInputCharCounter = document.querySelector('.body-input-char-counter');

	var valueLength = value.length;
	var counterValue;

	if ( valueLength < inputCharValue) {
		counterValue = `(${inputCharValue - valueLength})`;
	} else {
		counterValue = `(0)`;
	}
console.log(inputCharValue)
	if(inputType === 'title') {
		titleInputCharCounter.textContent = counterValue;
	} else {
		bodyInputCharCounter.textContent = counterValue;
	}
  };