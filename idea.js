class Idea {
	constructor(id, title, body,starImg, qualityCount) {
		this.id = id;
		this.title =  title;
		this.body = body;
		this.star = false; 
		this.starImg = starImg || "images/star.svg"
		this.qualityCount = qualityCount || 0;
	}

	saveToStorage(ideaArray) {
	var stringified = JSON.stringify(ideaArray);
	localStorage.setItem('array', stringified);
	}

	deleteItemInStorage(elId) {
		var itemsInLocalStorage = JSON.parse(localStorage.getItem('array'));
		for (var i = 0; i < itemsInLocalStorage.length; i++) {
			if(itemsInLocalStorage[i].id === elId) {
				  itemsInLocalStorage.splice(i,1);
				  localStorage.clear();
				  localStorage.setItem('array', JSON.stringify(itemsInLocalStorage));
			}
		}
	}

	starToggle() {
		this.star = !this.star;
		if (this.star == true) {
			this.starImg = "images/star-active.svg"
		} else {
			this.starImg = "images/star.svg"
		}
	}

	updateQuality(quality) {
		if (quality == 'upvote') {
			this.qualityCount++
		} else {
			this.qualityCount--
		}
	}
}
