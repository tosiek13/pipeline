function PipeGrid(canvas){
    this.canvas = canvas;
    this.nodes = new Array();
    this.rows = board.rows * 2 + 1;
    this.cols = board.cols * 2 + 1;
    this.fieldWidth = board.getFieldWidth();
    this.fieldHeight = board.getFieldHeight();
    this.xStep = this.fieldWidth / 2;
    this.yStep = this.fieldHeight / 2;
}

PipeGrid.prototype.createNodes = function(){
    for(var i = 0; i < this.cols; i++){
        this.nodes[i] = new Array();
        var j = (i + 1)%2;
        //var elements = Math.floor(this.rows / 2);
        for(j; j<this.rows; j+=2){
            this.nodes[i][j] = new Array();
            //alert("x = " + i + "y = " + j); 
        }
    }
}

PipeGrid.prototype.paint = function(){
    /*Cainting board*/
    this.ctx = this.canvas.getContext("2d");

    this.ctx.beginPath();
    //vertical lines
    for (var x = 0; x < (this.canvas.width - this.xStep); x += this.xStep){
        this.ctx.moveTo(0.5 + x, 0);
        this.ctx.lineTo(0.5 + x, this.canvas.height);
    }
     
    //horizontal lines
    for (var y = 0; y < (this.canvas.height - this.yStep); y += this.yStep) {
        this.ctx.moveTo(0, 0.5 + y);
        this.ctx.lineTo(this.canvas.width + 1, 0.5 +  y);
    }
 
    //Painting on canvas
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
}