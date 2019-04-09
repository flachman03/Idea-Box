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
var searchInput = document.querySelector('.search-form__search-input');
var searchBtn = document.querySelector('.search-form__search-btn');
var displayList = document.querySelector('.search-form__display-list')
var mainTopSection = document.querySelector('.main__top-section');
var titleInputCharCounter = document.querySelector('.title-input-char-counter');
var bodyInputCharCounter = document.querySelector('.body-input-char-counter');
var ideaArray = JSON.parse(localStorage.getItem('array'))|| [];
var searchArray = [];
var qualityArray = ['Swill', 'Plausable', 'Genius']
var sideBar = document.querySelector('.sidebar');
var burgerButton = document.querySelector('.burger_button');
var sidebarSideContainerTwo = document.querySelector('.sidebar__side-container-2');
var lineOne = document.querySelector('.line_one');
var lineTwo = document.querySelector('.line_two');
var lineThree = document.querySelector('.line_three');

/*----------------Starting Conditions-------------*/
if (ideaArray.length != 0) {
	onLoad();
	pageRefresh(ideaArray);
}

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
		if (e.target.className.includes('card-header__delete-btn')) {
			deleteBtn(idea)
		}
})

searchInput.addEventListener('keyup', function(e) {
	searchField()
})

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
	titleInputCharCounter.textContent = `(32)`;
	bodyInputCharCounter.textContent = `(130)`;
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
		item = new Idea(item.id, item.title, item.body, item.star,  item.starImg , item.qualityCount)
		return item;
	})
	ideaArray = newArray;
}

function updatePage(newArray) {
			ideaArray = newArray;
			if (ideaArray.length > 0) {
				ideaArray[0].saveToStorage(ideaArray);
			}
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



function deleteBtn(idea) {
	var updatedArray = [];
	newArray = ideaArray.map(item => {
		if (item.id != idea) {
			updatedArray.push(item)
		} 
		localStorage.removeItem('array')
	})
	updatePage(updatedArray)
}

mainTopSection.addEventListener('keyup', function(e) {
	
	if (e.target.className.includes('idea-form__title-input')) {
		var valueLength = titleInput.value.length;
		titleInputCharCounter.textContent = `(${32 - valueLength})`;
	}
  if (e.target.className.includes('idea-form__body-input')) {
		var valueLength = bodyInput.value.length;
		bodyInputCharCounter.textContent = `(${130 - valueLength})`;
	}
});


function searchField() {
	var searchValue = searchInput.value.toUpperCase();
	var newArray = [];
	ideaArray.forEach(item => {
			var string = (item.title.toUpperCase());
			var string2 = (item.body.toUpperCase());
		if (string.indexOf(searchValue) > -1) {
			newArray.push(item.title)
		}
		if (string2.indexOf(searchValue) > -1) {
			newArray.push(item.body)
		}
	 })
	 displayList.innerHTML = "";
	 if (searchValue == '') {
		 newArray = [];
	 }
	 pushArray(newArray);
}

function pushArray(array) {
		if (array != 0) {
			displayList.classList.add("block")
		} else { 
			displayList.classList.add("hide")
		}
			array.forEach(item => {
				displayList.innerHTML += `<li class="display-list__list-item">${item}</li>`
	})
};

// show starred cards..

sideBar.addEventListener('click', function(e) {
	if (e.target.className.includes('sidebar-starred-ideas-btn')) {
		bottomSection.innerHTML = '';
	ideaArray.map(item => {
		if (item.star == true) {
			addCard(item)
		} 
	})
	}	
})

// burger button

burgerButton.addEventListener('click', function() {
	 sidebarSideContainerTwo.classList.toggle('hide-menu');
	 if (sidebarSideContainerTwo.getAttribute("class").includes('hide-menu') === true) {
		 burgerButton.src = "images/menu-close.svg";
	 } else {
		 burgerButton.src = "images/menu.svg";
	 }
  })
  