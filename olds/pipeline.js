//Identifying canvas element
var c = document.getElementById("canvas");
var lines = document.getElementById("water");
//Retrieves the context to be drawn or null if not 
//supported by the browser
var ctx = c.getContext("2d");
var ctxl = c.getContext("2d");
//Assigning squareClick() function to click on canvas
c.addEventListener("click", squareClick);
//Number of squares horizontally & vertically [ 4x4 ]
var kBoardWidth = 4;
var kBoardHeight= 4;
//Height and width of the square
var kPieceWidth = 50;
var kPieceHeight= 50;
 
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var divElement  = document.getElementById(timer);


//Holds the images of blocks - to bild pipeline
var blocks = new Array();

//Control matrix that will make the checks later
var matrix = new Array();
//Objects that will store the properties of squares
var rect = new Square();
 
/* 
    Function call to click on the canvas , responsible 
    for checking
*/
function squareClick(e) 
{
    //var square receives Square object 
    //( color, line, column)
    var square = getCursorPosition(e);
    
   
    //Assigns values ​​to object rect1
    rect.column = square.column;
    rect.line = square.line;   
    //Paint the square as its line position, 
    //column and its color  
    paintSquare(rect);
   
       
}
 
function paintSquare(r) 
{
    //Square color
   // ctx.fillStyle = r.cor;
    //x-coordinate , y-coordinate
    //square width, height in pixels
    //ctx.fillRect((kPieceHeight*r.column)+1,
    //    (kPieceWidth*r.line)+1,kPieceWidth-1,kPieceHeight-1);
   // ctx.drawImage(base_image, (kPieceHeight*r.column)+1, (kPieceWidth*r.line)+1);



  /*  ctxl.beginPath();
    ctxl.moveTo(100, 20);

    // line 1
    ctxl.lineTo(200, 160);

    // quadratic curve
    ctxl.quadraticCurveTo(230, 200, 250, 120);

    // bezier curve
    ctxl.bezierCurveTo(290, -40, 300, 200, 400, 150);

    // line 2
    ctxl.lineTo(500, 90);

    ctxl.lineWidth = 5;
    ctxl.strokeStyle = 'blue';
    ctxl.stroke();*/

    //printStraitLine(r, 50, 10, 1, 0);
    //animateLine(r, 0, 200, 10, 1, 12);

    //myLine = new Line(r, 100, 10, 1, 2000);
    //myLine.draw(ctxl);

    //printStraitLine(ctxl, 0,0,100,100,10, 'blue');
    animateLine(ctxl, 100, 100, 200, 200, 10, 100000, 20);

}
 
/* 
    Square object constructor
*/
function Square(cor, line, column) 
{
    //if no parameter is passed then receives '' ( null)
    this.cor = (cor === undefined)? '' : cor;          
    this.line = (line === undefined)? '' : line;  
    this.column = (column === undefined)? '' : column;  
}
 
function getCursorPosition(e) 
{
    //returns square with .line and .colunm properties
    var x;
    var y;
 
    if (e.pageX != undefined && e.pageY != undefined) 
    {
        x = e.pageX;
        y = e.pageY;
    }
    else
    {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
 
    x -= c.offsetLeft;
    y -= c.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
 
    return new Square('',Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
}
/* 
    Checks game state
*/
function checkGameState() 
{
    //end starts true
    end = true;
}
 
/* 
    First function to be called, has the task of 
    designing the board and fill the control matrix
*/
function initGame()
{
    //vertical lines
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) 
    {
        ctx.moveTo(0.5 + x, 0);
        ctx.lineTo(0.5 + x, kPixelHeight);
    }
     
    //horizontal lines
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) 
    {
        ctx.moveTo(0, 0.5 + y);
        ctx.lineTo(kPixelWidth, 0.5 +  y);
    }
 
    //Painting on canvas
    ctx.strokeStyle = "#6C7A89";
    ctx.stroke();
 
    //Filling the control matrix with white, 
    //which will be the equivalent of null for us
    for (var l = 0; l < kBoardHeight; l++) 
    {
        //multidimensional array[line x column]
        matrix[l] = new Array();
        for (var c = 0; c < kBoardWidth; c++) 
        {
            matrix[l][c] = "#fff";
        }
    } 

    //Loading imeges - blocks
    /*straight = new Image();
    straight.src = "straight.jpg";
    blocks.pop(straight);*/

    //refresh(); 
}

var timer = 0;
function drawWater(){
    document.getElementById("timer").innerHTML = timer;
    refresh();
}

function refresh(){
    timer += 0.01
    setTimeout(function(){
        drawWater();
    }, 10);
}


/*function printStraitLine(x, y, currentLength, length, width, timeout){

    ctxl.beginPath();

    switch(beg_code){
        case 1:
            ctxl.moveTo(x,y);
            ctxl.lineTo(x, y+currentLength);
            ctxl.lineWidth = width;
            ctxl.strokeStyle = 'blue';
            ctxl.stroke();
            break;
    }

    animateLine(rect, currentLength, length, width, beg_code, timeout);
    
}*/

function printStraitLine(ctx, x, y, xEnd, yEnd, width, color){

    ctx.beginPath();

    ctxl.moveTo(x,y);
    ctxl.lineTo(xEnd, yEnd);
    ctxl.lineWidth = width;
    ctxl.strokeStyle = color;
    ctxl.stroke();
    alert("Line");

    //animateLine(rect, currentLength, length, width, beg_code, timeout);
    
}


function animateLine(ctx, x, y, xEnd, yEnd, width, time, stills){
    var xLength = xEnd - x;
    var yLength = yEnd - y;
    var stepX = xLength / stills;
    var stepY = yLength /stills;
    var timeout = time / stills;

   // alert(stills);

    
        //document.getElementById("timer").innerHTML = timeout * i;
    setTimeout(printStraitLine(ctx, x, y, x + stepX,y + stepY, width, 'blue'), 1000000);  
}

function Line(rect, length, width, beg_code, timeOfDrawing_ms){
    this.x = (kPieceHeight*rect.column)+1;
    this.y = (kPieceWidth*rect.line)+1;
    this.length = length;
    this.width = width;
    this.beg_code = beg_code;
    this.increase = length / timeOfDrawing_ms;
    this.myTimeout = length / this.increase;
    this.currentLength = 0;
}

Line.prototype.draw = function() {
  animateLine(this.x, this.y, this.currentLength += this.increase, this.width, this.beg_code, this.myTimeout)
};


