class Util{
	constructor(){
	}
	getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    var marginTop = canvas.style.marginTop;

	    var x = evt.clientX - rect.left;
	    var y = evt.clientY - rect.top - marginTop
    
	    return new Point(x, y);
	}

	random(min, max){
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomColor(){
		var colors = ["#C0392B", "#9B59B6", "#2980B9", "#17A589", "#D4AC0D"];
		return colors[this.random(0, colors.length-1)]
	}

	getDistance(i, f){
		return Math.abs(Math.sqrt(
			Math.pow((f.x-i.x), 2) + Math.pow((f.y-i.y), 2)));
	}

	getAngle(p1, p2){
        return ((Math.atan2(p2.y - p1.y, p2.x - p1.x)));
    }

	color(hex, lum) {

		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}
		return rgb;
	}
	cirCol(x1, y1, r1, x2, y2, r2){
    	return (this.getDistance(new Point(x1, y1),
    	new Point(x2, y2)) < (r1+r2));
    }
}