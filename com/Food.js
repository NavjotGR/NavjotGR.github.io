class Food{
	constructor(ctx, x, y){
		this.ctx = ctx;
		this.pos = new Point(x, y);
		this.sizeMin = 7;
		this.sizeMax = 12;
		this.mainColor = ut.randomColor();
		this.size = ut.random(this.sizeMin, this.sizeMax); //tamaño comida random
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	draw(player){
		this.pos.x -= player.velocity.x;
		this.pos.y -= player.velocity.y;
		this.ctx.globalAlpha = Math.random() * 0.5;
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(parseInt(this.pos.x), parseInt(this.pos.y), this.size, 0, 2*Math.PI);
		this.ctx.fill(); //draw comida
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = this.mainColor;
		this.ctx.beginPath();
		this.ctx.arc(parseInt(this.pos.x), parseInt(this.pos.y), this.size/2, 0, 2*Math.PI);
		this.ctx.fill(); //draw particulas
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	eat(){
		var index = game.foods.indexOf(this);
		game.foods.splice(index, 1);
	}
}