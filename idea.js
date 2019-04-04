class Idea {
	constructor(id, title, body) {
		this.id = id;
		this.title =  title;
		this.body = body;
		this.star = false;
		this.quality = []; 
	}

	saveToStorage(ideaArray) {
	var stringified = JSON.stringify(ideaArray);
	localStorage.setItem('array', stringified);
	}

	deleteFromStorge() {
		localStorage.removeItem(this.id)
	}
}
