function Stream(XBeg, YBeg, XEnd, YEnd, color, width){
    this.XBeg = XBeg;
    this.YBeg = YBeg;
    this.XEnd = XEnd;
    this.YEnd = YEnd;
    this.color = color;
    this.width = width;

    this.canvas = document.getElementById("board");

    /////////////////////////////////////////////////////////////////////////////Zajmi się tworzeniem path;
    this.path;
}

Stream.prototype.animate = function(){
    alert("animate");
    this.changeField();
    setTimeout(nextAnimationCaller, 3000, this);
    this.cratePath();
    new Animation(this.canvas, this.path, 3000, 30, this);
}

Stream.prototype.changeField = function(){
    alert("changeField");
    var neighbours = pipeGrid.getNeighbours(this.XEnd, this.YEnd);
    alert("neighbours from field  X = " + this.XEnd + " Y = " + this.YEnd);

    for(var i = 0; i<2; i++){
        if (neighbours[i] != null){
            var XN = neighbours[i].X;
            var YN = neighbours[i].Y;
            alert("neighbours[" + i + "] = X " + XN + " Y = " + YN);
            if(XN != this.XBeg || YN != this.YBeg){
                alert("Found");
                this.updateCoordinates(XN, YN);
                break;
            }
        }
    }
    //alert("No neighbours found - you losed");
}

Stream.prototype.init = function(){
   // alert("init");
    var x = this.XBeg / 2 * board.getFieldWidth();
    var y = this.YBeg / 2 * board.getFieldHeight();
    var xDiff = (this.XEnd - this.XBeg) / 2 * board.getFieldWidth();
    var yDiff = (this.YEnd - this.YBeg) / 2 * board.getFieldHeight();

    var line = new Line(x, y, xDiff, yDiff, this.color, this.width);

    setTimeout(nextAnimationCaller, 10000, this);
    new Animation(this.canvas, line, 10000, 30, this);
}

Stream.prototype.cratePath = function(){
    alert("Path creation");
    var begCoor = nodeToPixels(this.XBeg, this.YBeg);
    var endCoor = nodeToPixels(this.XEnd, this.YEnd);
    alert("Path creating: XBeg" +  this.XBeg + " YBeg" + this.YBeg + " XEnd = " +  this.XEnd + " YEnd" + this.YEnd);
    alert("Path creating: xbeg" +  begCoor.X + " ybeg" + begCoor.Y + " xend = " + endCoor.X + " yend = " + endCoor.Y);
    //Linia prosta
    if(this.XBeg == this.XEnd || (this.YBeg == this.YEnd)){
        alert("Line");
        this.path = new Line(begCoor.X, begCoor.Y, endCoor.X - begCoor.X, endCoor.Y - begCoor.Y, this.color, this.width);
        return;
    }else{
        alert("Arc");
        this.path = new Arc(this.XBeg, this.YBeg, this.XEnd, this.YEnd);
        return;
    }
    alert("EndGame - no neighbour");
}

function nextAnimationCaller(stream){
    alert("animation caller");
    stream.animate();
}

//Called after changing field
Stream.prototype.updateCoordinates = function(newXEnd, newYEnd){
    this.XBeg = this.XEnd;
    this.YBeg = this.YEnd;
    this.XEnd = newXEnd;
    this.YEnd = newYEnd;

    alert("new X = " + this.XEnd + ", new Y = " + this.YEnd);
}

 /* gets the field, thatwas cliecked */
function getFieldFromCoordinates(x, y) {

    return new Field(Math.floor(y/board.getFieldHeight()), Math.floor(x/board.getFieldWidth()));
}