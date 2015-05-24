/***
** This class represents the nodes on board.
** Nodes are positions where stream may begin or finish his move 
** through the field.
**
** You can get, accessable neighbour (max 2) getNeighgour(X, Y);
** For adding there is no method, responisibility moved to pipeMenager
** 
***/

function PipeGrid(canvas){
    this.canvas = canvas;
    this.nodes;
    this.rows = board.rows * 2 + 1;
    this.cols = board.cols * 2 + 1;
    this.fieldWidth = board.getFieldWidth();
    this.fieldHeight = board.getFieldHeight();
    this.xStep = this.fieldWidth / 2;
    this.yStep = this.fieldHeight / 2;
}

/*Returns the array of nearest Nodes, that are avaiable (through existing path)*/
PipeGrid.prototype.getNeighbours = function(X, Y){
    var position = this.arrayIndexesFromNodes(X, Y);

    return this.nodes[position.X][position.Y];
}

/* Returns position in nodes array of node with coordinates X, Y */
PipeGrid.prototype.arrayIndexesFromNodes = function(X, Y){
    return new Node(X, Math.floor(Y/2));
}

/*Creates Nodes, and array to every node, tha will hold info about paths*/
PipeGrid.prototype.createNodes = function(){
    this.nodes = new Array(this.cols);
    for(var i = 0; i < this.cols; i++){
        var inColumn = board.rows;
        if (i % 2 != 0){
            inColumn++;
        }else{}
        this.nodes[i] = new Array(inColumn);

        for(var j = 0; j < inColumn; j++){
            this.nodes[i][j] = new Array(2);
            //alert("x = " + i + "y = " + j); 
        }
    }
}

/*Printing grid representation (dots in place of Nodes)*/
PipeGrid.prototype.paint = function(){
    this.ctx = this.canvas.getContext("2d");

    for(var i = 0; i < this.nodes.length; i++){
        for(var j = 0; j<this.nodes[i].length; j++){
            //alert("x(i) = " + i + " y(j) = " + j);
            var node = this.toPixels(i, j);
            this.printDot(this.ctx, node.X, node.Y);
        }
    }
}


PipeGrid.prototype.printDot = function(ctx, x, y){
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

/**Returns Node, that represents position of field center in canvas.
* Warn ! Node that is returned is not part of the grid.
***/
PipeGrid.prototype.toNodeCoordinates = function(field){
    return new Node( field.X * 2 + 1, field.Y * 2 + 1);
}

/*Returns the position in pixels of noded - parameter - indexes in nodes array*/
PipeGrid.prototype.toPixels = function(i, j){
    var y;
    if( i%2 == 0){
        y = (j + 0.5)* board.getFieldHeight();
    }else{
        y = j * board.getFieldHeight();
    }
    var x = i * (0.5) * board.getFieldWidth()

    return new Node(x, y);
}

function nodeToPixels(X, Y){
    var x = X/2 * board.getFieldWidth();
    var y = Y/2 * board.getFieldHeight();
    return new Node(x, y);
}

function gridToField(X, Y){
    return new Field(Math.floor(Y/2), Math.floor(X/2));
}


/*Przelicza współrzędne pola na współrzędne gridu - czyli węzła*/
function Node(X, Y){
    this.X = X;
    this.Y = Y;
}