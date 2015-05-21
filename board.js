function Board(canvas, rows, cols){
	this.canvas = canvas;
	this.rows = rows;
	this.cols = cols;
	this.ctx;
	this.fields = new Array();

	this.fieldHeight = (canvas.height - 1)/ rows;
	this.fieldWidth = (canvas.width  - 1)/ cols;
}

/*Drows current(first from queue clock) on element that was pass as param*/
Board.prototype.drawCurrentBlock = function(field) {
    this.canvas.getContext("2d").drawImage(getImage(nextImage), field.x + 0.5, field.y + 0.5, this.fieldWidth - 1, this.fieldHeight - 1);
}

/***
* Object that represents field on board.
** It holds information about it's posicion on canvas.
** Value is a distance between left-top corner of canvas
** and left-top of field.
** Small letters (x, y) - pixel distance.
** Big letters(X, Y) - field distance.
***/
function Field(Y, X){
    this.X = X;
    this.Y = Y;
    this.x = X * board.getFieldWidth();
    this.y = Y * board.getFieldHeight();
}

/*Creates Board and paints it*/
Board.prototype.createBoard = function() {
	/* Creating fields */
	this.createFields();

	/*Cainting board*/
    this.ctx = this.canvas.getContext("2d");

    this.ctx.beginPath();
    //vertical lines
    for (var x = 0; x <= this.canvas.width + 1; x += this.fieldWidth){
        this.ctx.moveTo(0.5 + x, 0);
        this.ctx.lineTo(0.5 + x, this.canvas.height);
    }
     
    //horizontal lines
    for (var y = 0; y <= this.canvas.height; y += this.fieldHeight) {
        this.ctx.moveTo(0, 0.5 + y);
        this.ctx.lineTo(this.canvas.width + 1, 0.5 +  y);
    }
 
    //Painting on canvas
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();

    //Adding click listener - when user click on boardBanvas.
	this.canvas.addEventListener("click", clickHandler);
}

Board.prototype.createFields = function(){
	//Initializing Board with Fields
    for (var row = 0; row < this.rows; row++) {
        //multidimensional array[line x column]
        this.fields[row] = new Array();
        for (var col = 0; col < this.cols; col++) {
            this.fields[row][col] = new Field(row, col);
        }
    }
}

Board.prototype.getFieldHeight = function(){
	return this.fieldHeight;
}

Board.prototype.getFieldWidth = function(){
	return this.fieldWidth;
}