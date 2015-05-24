function prepareMenu(){
	var startButton = document.getElementById("startButton");
	startButton.addEventListener("click", showMenu);
}


function showMenu(){
	var buttonsDiv = document.getElementById("buttons");

	createLevelMenu();
}

function createLevelMenu(){
	var buttonsDiv = document.getElementById("buttons");

	var old = document.getElementById("startButton");
	var easy = document.createElement("BUTTON");
	var easyContent = document.createTextNode("EASY");
	easy.appendChild(easyContent);  
	buttonsDiv.replaceChild(easy, old);

	var medium = document.createElement("BUTTON");
	var mediumContent = document.createTextNode("MEDIUM");
	medium.appendChild(mediumContent);
	buttonsDiv.appendChild(medium);

	var hard = document.createElement("BUTTON");
	var hardContent = document.createTextNode("HARD");
	hard.appendChild(hardContent);
	buttonsDiv.appendChild(hard);
}

function createCanvases(){
	var canvas = document.createElement('canvas');
	canvas.id     = "board";

	var canvas = document.createElement('canvas');
	canvas.id     = "board";
}