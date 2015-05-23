boardCanvas.addEventListener("click", paint);

function paint(){
    var stream = new Stream(10, 50, 25, 225, 'red', 7);
    stream.animate();
}

function Stream(xBeg, yBeg, xEnd, yEnd, color, width){
    this.xBeg = xBeg;
    this.yBeg = yBeg;
    this.xEnd = xEnd;
    this.yEnd = yEnd;

    this.currentField = this.getNextField();
    this.xMove;
    this.yMove;

    this.canvas = document.getElementById("board");

    this.color = color;
    this.width = width;

    this.line = this.createLine();
}

Stream.prototype.animate = function(){
    new Animation(this.canvas, this.line, 2000, 30, this);
    setTimeout(nextAnimationCaller, 2000, this);
    this.changeField();
}

Stream.prototype.changeField = function(){
    this.currentField = this.getNextField();
    this.countMove();
    this.updateCoordinates();
   // alert("xBeg = " + this.xBeg + " yBeg = " + this.yBeg + "xEnd = " + this.xEnd + " yEnd = " + this.yEnd );
}

Stream.prototype.createLine = function(){
    return new Line(this.xBeg, this.yBeg, this.xEnd - this.xBeg, this.yEnd - this.yBeg, this.color, this.width);
}

Stream.prototype.createArc = function(){
    var x = 
    return new Arc()
    x, y, r, begAngle, endAngle, color, width
}

function nextAnimationCaller(stream){
    stream.animate();
}

//Called After counting moves in both axes;
Stream.prototype.updateCoordinates = function(){
    this.xBeg = this.xEnd;
    this.yBeg = this.yEnd;
    this.xEnd = this.xBeg + this.xMove;
    this.yEnd = this.yEnd + this.yMove;
}

/* Reads move according the code read from  */
Stream.prototype.countMove = function(){
    var code = this.currentField.code;
    code = 1;
    switch (code){
        case 1:
            this.xMove = 100;
            this.yMove = 100;
            this.line = this.createLine();
    }
}

/*Counts next field to go (after swiming throught actual)*/
Stream.prototype.getNextField = function(){
    var xDiff = this.xEnd - this.xBeg;
    var yDiff = this.yEnd - this.yBeg;

    var xInNextField;
    var yInNextField;
    if(xDiff != 0){
        xInNextField = this.xEnd + xDiff;
    }else{
        xInNextField = this.xEnd;
    }

    if(yDiff != 0){
        yInNextField = this.yEnd + yDiff;
    }else{
        yInNextField = this.yEnd;
    }

    return  getFieldFromCoordinates(yInNextField, xInNextField);
}

 /* gets the field, thatwas cliecked */
function getFieldFromCoordinates(x, y) {

    return new Field(Math.floor(y/board.getFieldHeight()), Math.floor(x/board.getFieldWidth()));
}