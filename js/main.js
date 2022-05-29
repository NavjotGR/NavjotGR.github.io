var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");
var ut = new Util();
var cursor = new Point(100, 100);
var game = new Game(ctxSnake, ctxFood, ctxHex);
var mouseDown = false;
var pause = false;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function speed(){ //velocidad al presionar raton
	if(mouseDown & game.snakes[0].length > 10){		
		game.snakes[0].length = game.snakes[0].length-1;
		if(game.snakes[0].length < 11) {
			game.snakes[0].velo = 4;
			mouseDown = false;
		}
		console.log("RUN");
		console.log("-Points: ", game.snakes[0].length-10)
	}
}
canvas.onmousemove = function(e){ //cuando mouse mueve
	cursor = ut.getMousePos(canvas, e);
	var ang = ut.getAngle(game.snakes[0].arr[0], cursor);
	game.snakes[0].changeAngle(ang);

}
canvas.onmousedown = function(){ //mouse DOWN
	pause = false;
	update();
	game.snakes[0].size += 3;
	if(game.snakes[0].length > 10) {
		game.snakes[0].velo = 7;
	}
	else if(game.snakes[0].state == 1) {
		game.snakes[0].state = 0;
	}
	mouseDown = true;
	var i = 0;
	while (i < 10){
		task(i);
		i++;
	}
	function task(i) {
		setTimeout(function() {
			speed();
		}, 2000 * i);
	}
}
canvas.onmouseup = function(){ //mouse UP
	game.snakes[0].velo = 4;
	mouseDown = false;
	game.snakes[0].size -= 3;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////;
document.onkeydown = function(e){
	if(e.keyCode == 32){ //tecla ESPACIO
		pause = false;
		update();
		game.snakes[0].velo = 4;
		if(game.snakes[0].state == 1) {
			game.snakes[0].state = 0;
		}
		console.log("Game Started...");
		mouseDown = true;
	}
	else if(e.keyCode == 80){ //tecla P
		pause = true;
		game.ctxSnake.fillStyle = 'white';
		game.ctxSnake.font = "bold 20px Arial";
		game.ctxSnake.fillText("PAUSED!", 900, 30);
		console.log("Game Paused...");
	}
	else if(e.keyCode == 68){ //tecla D
		game.snakes[0].state = 1;
		console.log("You died...");
	}
	else if(e.keyCode == 67){ //tecla C
		localStorage.clear();
		console.log("Highscore cleaned...");
	}
	/* else if(e.keyCode == 83){ //tecla S
		console.log("Saving data...");
		localStorage.setItem("Highscore",game.snakes[0].length);
	} */
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
game.init();
var updateId;
var previousDelta = 0;
var fpsLimit = 60; //frames
function update(currentDelta){
	if(pause){
		return;
	}
	updateId = requestAnimationFrame(update);
	var delta = currentDelta - previousDelta;
	if (fpsLimit && delta < 1000 / fpsLimit) return;
	previousDelta = currentDelta;

	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	game.draw();
}