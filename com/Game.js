class Game{
	constructor(ctxSnake, ctxFood, ctxHex){
		this.ctxSnake = ctxSnake;
		this.ctxFood = ctxFood;
		this.ctxHex = ctxHex;
		this.WORLD_SIZE = new Point(4000, 4000); //distancia de bordes
		this.SCREEN_SIZE = new Point(500, 500); //distancia de snake en pantalla
		this.world = new Point(-1200, -1200);
		this.snakes = [];
		this.foods = [];
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init(){
		this.snakes[0] = new Snake(this.ctxSnake, "Navjot", 0);
		this.generateFoods(Math.random() * (1500 - 2500) + 2500); //cantidad de comida
		console.log('%cPress SPACE key = Start the game', 'color: green; font-weight: bold;');
		console.log('%cPress P key = Pause the game', 'color: yellow; font-weight: bold;');
		console.log('%cPress D key = Disappear', 'color: red; font-weight: bold;');
		console.log('%cPress C key = Clear the hightscore', 'color: red; font-weight: bold;');
		console.log('%cKeep MouseDown = double Speed', 'color: cyan; font-weight: bold;');
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	draw(){
		if(this.snakes[0].state == 0) {
			this.snakes[0].move(); //mueve snake
		}

		for(var i=0; i<this.foods.length; i++) {
			this.foods[i].draw(this.snakes[0]); //draw food
		} 

		this.drawWorld();
		this.drawScore();
		this.drawKeys();
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	drawScore(){
		var start = new Point(20, 20);
		for (var i = 0; i < this.snakes.length; i++) {
			this.ctxSnake.fillStyle = this.snakes[i].mainColor;
			this.ctxSnake.font="bold 15px Arial";
			this.ctxSnake.fillText("Points:" + this.snakes[i].length,
			start.x-15, start.y +i+5);
			this.ctxSnake.fillText("Size:" + Math.floor(this.snakes[i].size / 1),
			start.x-15, start.y +i+20);
			this.ctxSnake.fillText("Speed:" + this.snakes[i].velo,
			start.x-15, start.y +i+35);
			this.ctxSnake.fillText("Food left:" + this.foods.length,
			start.x-15, start.y +i+50);
			this.ctxSnake.fillText("Hightscore:" + localStorage.getItem("Highscore"),
			start.x-15, start.y +i+65);
		}
	}
	drawKeys(){
		game.ctxSnake.fillStyle = 'white';
		game.ctxSnake.font = "bold 10px Arial";
		game.ctxSnake.fillText("Press SPACE key = Start the game", 5, 870);
		game.ctxSnake.fillText("Press P key = Pause the game", 5, 885);
		game.ctxSnake.fillText("Press D key = Disappear", 5, 900);
		game.ctxSnake.fillText("Press C key = Clear the hightscore", 5, 915);
		game.ctxSnake.fillText("Keep MouseDown = Double speed", 5, 930);
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	drawWorld(){
		this.ctxHex.fillStyle = "red"; //draw bordes
		this.ctxHex.fillRect(this.world.x-4, this.world.y-4, this.WORLD_SIZE.x+8, this.WORLD_SIZE.y+8);

		this.ctxHex.fillStyle = "black"; //draw plataforma
		this.ctxHex.fillRect(this.world.x, this.world.y, this.WORLD_SIZE.x, this.WORLD_SIZE.y);

		this.world.x -= this.snakes[0].velocity.x;
		this.world.y -= this.snakes[0].velocity.y;
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	generateFoods(n){
		for(var i=0; i<n; i++){
			this.foods.push(new Food(this.ctxFood, ut.random(-1200 +  50, 2800 - 50),
			ut.random(-1200 + 50, 2800 - 50)));
		}
		/* localStorage.setItem("Food",JSON.stringify(this.foods));
		console.log(localStorage.getItem("Food")) */
	}
}