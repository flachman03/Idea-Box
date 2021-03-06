class Idea {
	constructor(id, title, body, star, starImg, qualityCount) {
		this.id = id;
		this.title =  title;
		this.body = body;
		this.star = star || false; 
		this.starImg = starImg || "images/star.svg"
		this.qualityCount = qualityCount || 0;
	}

	saveToStorage(ideaArray) {
	var stringified = JSON.stringify(ideaArray);
	localStorage.setItem('array', stringified);
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
			this.qualityCount = Math.min(this.qualityCount + 1, 2)
		} else {
			this.qualityCount = Math.max(this.qualityCount - 1, 0)
		}
	}
}


