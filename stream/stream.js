boardCanvas.addEventListener("click", paint);

function paint(){
    var stream = new Stream(0, 0, 50, 50, 'red', 7);
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

    this.color = color;
    this.width = width;
}

Stream.prototype.animate = function(){
    var canvas = document.getElementById("board");
    var line = new Line(this.xBeg, this.yBeg, this.xEnd, this.yEnd, this.color, this.width);
    var animation = new Animation(canvas, line, 2000, 30, this);
}

Stream.prototype.changeField = function(){
    this.currentField = this.getNextField();
    this.countMove();
    this.updateCoordinates();
    this.animate();
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
            this.xMove = 50;
            this.yMove = 50;
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