/*  */
function Stream(begNode, direcionNode, endNode, color, width){
    this.XBeg = begNode.X;
    this.YBeg = begNode.Y;
    this.XEnd = direcionNode.X;
    this.YEnd = direcionNode.Y;
    
    //Destination coordinates
    this.XStop = endNode.X;
    this.YStop = endNode.Y;

    this.color = color;
    this.width = width;

    this.canvas = document.getElementById("board");

    /////////////////////////////////////////////////////////////////////////////Zajmi się tworzeniem path;
    this.path;
}

Stream.prototype.animate = function(){
    if(gameFlag){
        this.changeField();
        setTimeout(nextAnimationCaller, 3000, this);
        this.cratePath();
        new Animation(this.canvas, this.path, 3000, 30, this);
    }
}

Stream.prototype.changeField = function(){
    var neighbours = pipeGrid.getNeighbours(this.XEnd, this.YEnd);

    for(i = 0; i<2; i++){
        if (neighbours[i] != null){
            //alert("Check not null neighbour + " + i);
            var XN = neighbours[i].X;
            var YN = neighbours[i].Y;
            //alert("Neighbour X = " + XN + ", Y = " + YN);
            if(XN != this.XBeg || YN != this.YBeg){
                this.updateCoordinates(XN, YN);
                var fieldNode = board.getFieldFromGridEdges(this.XBeg, this.YBeg, XN, YN);
                //alert("Locking field X = " + fieldNode.X + ", Y = " + fieldNode.Y);
                board.setFieldState(fieldNode, 1);
                //modifyConnections(fieldNode, 1);
                pipeGrid.lockNode(this.XBeg, this.YBeg);

                if(this.isInStreamEnd()){
                    var index = streams.indexOf(this);
                    if (index > -1) {
                        //alert("DEleteing stream with indeax = " + index);
                        streams.splice(index, 1);
                        checkEndOfGameConditions();
                    }
                }

                break;
            }
        }
        if( i == 1){
            setGameState(2);
        }
    }
}

Stream.prototype.init = function(){
    //Creating Line from Beg to first Edge.
    var x = this.XBeg / 2 * board.getFieldWidth();
    var y = this.YBeg / 2 * board.getFieldHeight();
    var xDiff = (this.XEnd - this.XBeg) / 2 * board.getFieldWidth();
    var yDiff = (this.YEnd - this.YBeg) / 2 * board.getFieldHeight();

    var ctx = boardCanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, fieldSize * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.color;
    ctx.stroke();

    var line = new Line(x, y, xDiff, yDiff, this.color, this.width);

    setTimeout(nextAnimationCaller, 15000, this);
    new Animation(this.canvas, line, 15000, 30, this);
}

Stream.prototype.cratePath = function(){
    var begCoor = nodeToPixels(this.XBeg, this.YBeg);
    var endCoor = nodeToPixels(this.XEnd, this.YEnd);

    //Linia prosta
    if(this.XBeg == this.XEnd || (this.YBeg == this.YEnd)){
        this.path = new Line(begCoor.X, begCoor.Y, endCoor.X - begCoor.X, endCoor.Y - begCoor.Y, this.color, this.width);
        return;
    }else{
        this.path = new Arc(this.XBeg, this.YBeg, this.XEnd, this.YEnd, this.color, this.width);
        return;
    }
}

function nextAnimationCaller(stream){
    stream.animate();
}

//Called after changing field
Stream.prototype.updateCoordinates = function(newXEnd, newYEnd){
    this.XBeg = this.XEnd;
    this.YBeg = this.YEnd;
    this.XEnd = newXEnd;
    this.YEnd = newYEnd;

}

 /* gets the field, thatwas cliecked */
function getFieldFromCoordinates(x, y) {

    return new Field(Math.floor(y/board.getFieldHeight()), Math.floor(x/board.getFieldWidth()));
}

/* Cheeks weather next destination node is end of stream.
** if so, checks weather it's the suitable end (color) or end field coordinates - not decided yet.
 */
Stream.prototype.isInStreamEnd = function(){
    if((this.XEnd%2 == 1) && (this.YEnd%2 == 1))
        return true;
    return false;
}