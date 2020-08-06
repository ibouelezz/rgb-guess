var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("button");
var modeButtons = document.querySelectorAll(".mode");

colorDisplay.textContent = pickedColor;

for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");	
		this.textContent === "Easy" ?	numSquares = 3 : numSquares = 6;
		reset();
	});
}

function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

for(var i = 0; i < squares.length; i++){
	squares[i].style.background = colors[i];

	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;

		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again!";
		} else {
			this.style.backgroundColor = "#494b4f";
			messageDisplay.textContent = "Try Again";
		}
	})
}

function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor() {

	var randomColor = Math.floor(Math.random() * colors.length);
	return colors[randomColor];

}

function generateRandomColors(num){
	var arr = [];

	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}

	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 266);
	var g = Math.floor(Math.random() * 266);
	var b = Math.floor(Math.random() * 266);

	return "rgb" + "(" + r + ", " + g + ", " + b + ")";
}