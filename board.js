function BoardPainter(ctx){
	this.ctx = ctx;
}

BoardPainter.prototype.drawCurrentBlock = function(field) {
	//alert("Painting block" + field.y + " " + field.x);
    this.ctx.drawImage(getNextImage(nextImage),field.x, field.y, kPieceWidth, kPieceHeight);
}