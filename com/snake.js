class Snake{
	constructor(ctx, name, id){
		this.ctx = ctx;
		this.name = name;
		this.id = id;
		this.velo =  4; //velocidad
		this.state = 0; //estado 0 = vivo / 1 = muerto
		this.tail = 0.2; //cola

		this.pos = new Point(game.SCREEN_SIZE.x, game.SCREEN_SIZE.y);
		this.velocity = new Point(0, 0);
		this.angle = ut.random(0, Math.PI);

		this.length = 10;
		this.MAXSIZE = 15;
		this.size = 7;

		//color
		this.mainColor = ut.randomColor();
		this.midColor = ut.color(this.mainColor, 0.33);
		this.supportColor = ut.color(this.midColor, 0.33);

		this.arr = [];
		this.arr.push(new Point(game.SCREEN_SIZE.x, game.SCREEN_SIZE.y));
		for(var i=1; i<this.length; i++){
			this.arr.push(new Point(this.arr[i-1].x, this.arr[i-1].y));
		}
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	drawHeadOneEye(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		//cabeza
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size+2, 0, 2*Math.PI);
		this.ctx.fill();
		//cara
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size, 0, 2*Math.PI);
		this.ctx.fill();
		//ojo
		var d = 2;
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/1.5, 0, 2*Math.PI);
		this.ctx.fill();
		//retina
		d = 3;
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(x + d*Math.cos(this.angle), y + d*Math.sin(this.angle), this.size/4, 0, 2*Math.PI);
		this.ctx.fill();
		//name
		this.ctx.fillStyle = "white";
		this.ctx.font="12px Arial";
		this.ctx.fillText(this.name, x-15, y-15);
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	drawBody(x, y, i){
		var grd=this.ctx.createRadialGradient(x, y, 2, x+4, y+4, 10);
		grd.addColorStop(Math.random() * 0.5, this.supportColor);
		grd.addColorStop(Math.random() * 1, this.midColor);

		var radius = this.size + (i*this.tail);

		this.ctx.beginPath();
		this.ctx.fillStyle = this.mainColor;
		this.ctx.arc(x, y, radius+1, 0, 2*Math.PI);
		this.ctx.fill();

		this.ctx.fillStyle = grd;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, 2*Math.PI);
		this.ctx.fill();
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	move(){
		this.velocity.x = this.velo*Math.cos(this.angle);
		this.velocity.y = this.velo*Math.sin(this.angle);
		var d = this.size/2;
		for(var i=this.length-1; i>=1; i--){
			this.arr[i].x = this.arr[i-1].x - d*Math.cos(this.angle);
			this.arr[i].y = this.arr[i-1].y - d*Math.sin(this.angle);
			this.drawBody(this.arr[i].x, this.arr[i].y, i);
		}

		this.drawHeadOneEye();
		this.checkColFood();
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	changeAngle(angle){
		this.angle = angle;
	}

	/* die(){
		this.state = 1;
		location.reload();
	} */

	checkColFood(){
		var x = this.arr[0].x;
		var y = this.arr[0].y;
		for (var i = 0; i < game.foods.length; i++) {
			if(ut.cirCol(x, y, this.size+1, game.foods[i].pos.x,
			game.foods[i].pos.y, game.foods[i].size)){
				game.foods[i].eat();
				this.addPoints(i);
				console.log("EAT");
				console.log("+Points: ", this.length-10);
				console.log("+Size: ", this.size);
			}
		}
	}

	addPoints(){
		this.length++;
		this.size +=0.03;
		this.arr.push(new Point(-100, -100));
		if(game.snakes[0].length > localStorage.getItem("Highscore")) {
			localStorage.setItem("Highscore", game.snakes[0].length);
		}
	}
}