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
Board.prototype.drawBlock = function(field, imageCode) {
    this.canvas.getContext("2d").drawImage(images.getImage(imageCode), field.x + 0.5, field.y + 0.5, this.fieldWidth - 1, this.fieldHeight - 1);
}

/*Creates Board and paints it*/
Board.prototype.createBoard = function() {
	/* Creating fields */
	this.createFields();

    /* Paintinh help lines */
    this.paintBoard();

    //Adding click listener - when user click on boardBanvas.
	this.canvas.addEventListener("click", clickHandler);
}

Board.prototype.paintBoard = function(){
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
    this.ctx.strokeStyle = "green";
    this.ctx.stroke();
}

Board.prototype.setFieldState = function(field, code){
    //Setting field code - to unable modifying it when it was already flooded by stream.
    this.fields[field.Y][field.X].code = code;
    //Null-ing neighbours, to prevent other streams from swam into other stream.
    this.fields[field.Y][field.X]
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

Board.prototype.getFieldFromGridEdges = function(XBeg, YBeg, XEnd, YEnd){
    var XGrid;
    var YGrid;
    if( XBeg == XEnd || (YBeg == YEnd)){
        alert("lock in horizontal.");
        if(XBeg == XEnd){
            XGrid = XBeg;
            YGrid = YBeg + 1;
        }else{
            XGrid = XBeg + 1;
            YGrid = YBeg;
        }
    }else{
        if( XBeg%2 == 1){
            XGrid = XBeg;
        }else{
            XGrid = XEnd;
        }if( YBeg%2 == 1){
            YGrid = YBeg;
        }else{
            YGrid = YEnd;
        }
    }

    return gridToField(XGrid, YGrid)
}


////////////// FIELD /////////////////////////
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
    this.code;
}

Board.prototype.isActive = function(field){
    if(this.fields[field.Y][field.X].code < 2){
        return false
    }
    return true;
}