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

	// deleteFromStorge(elId) {
	// 	var itemsInLocalStorage = JSON.parse(localStorage.getItem('array'));

	  
	// //   itemsInLocalStorage.splice(elIndex,1)

	// // var myId = itemsInLocalStorage.findIndex(this)

	// //   console.log(this)
	//   console.log(itemsInLocalStorage)
	// }

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
