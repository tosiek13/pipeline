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

    this.line = new Line(this.xBeg, this.yBeg, this.xEnd - this.xBeg, this.yEnd - this.yBeg, this.color, this.width);
}

Stream.prototype.animate = function(){
    setTimeout(nextAnimationCaller, 3000, this);
    new Animation(this.canvas, this.line, 3000, 30, this);
    this.changeField();
}

Stream.prototype.changeField = function(){
    this.currentField = this.getNextField();
    this.countMove();
    this.updateCoordinates();
    this.line = new Line(this.xBeg, this.yBeg, this.xEnd - this.xBeg, this.yEnd - this.yBeg, this.color, this.width);
   // alert("xBeg = " + this.xBeg + " yBeg = " + this.yBeg + "xEnd = " + this.xEnd + " yEnd = " + this.yEnd );
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