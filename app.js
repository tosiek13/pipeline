//Identifying canvas element
var c = document.getElementById("canvas");
//Retrieves the context to be drawn or null if not 
//supported by the browser
var ctx = c.getContext("2d");
//Assigning squareClick() function to click on canvas
c.addEventListener("click", squareClick);
//Number of squares horizontally & vertically [ 4x4 ]
var kBoardWidth = 4;
var kBoardHeight= 4;
//Height and width of the square
var kPieceWidth = 90;
var kPieceHeight= 90;
 
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);
//Moves counter
var moves = 0;
//Color positions matrix [ 4x4 ]
var colors = [
    ['#1abc9c','#3498db','#9b59b6','#f39c12'],
    ['#9b59b6','#34495E','#c0392b','#f1c40f'],
    ['#34495E','#f1c40f','#27ae60','#f39c12'],
    ['#27ae60','#3498db','#1abc9c','#c0392b'],
];          
//Control matrix that will make the checks later
var matrix = new Array();
//Objects that will store the properties of squares
var rect1 = new Square();
var rect2 = new Square();
 
/* 
    Function call to click on the canvas , responsible 
    for checking
*/
function squareClick(e) 
{
    //var square receives Square object 
    //( color, line, column)
    var square = getCursorPosition(e);
    //Check that prevents the user to click on squares 
    //already painted
    if(matrix[square.line][square.column] != '#fff') 
        return;
    //If no square was selected then
    if(rect1.cor == '' && rect2.cor == '')
    {
        //Assigns values ​​to object rect1
        rect1.cor = colors[square.line][square.column];
        rect1.column = square.column;
        rect1.line = square.line;   
        //Paint the square as its line position, 
        //column and its color  
        paintSquare(rect1);
    }
    else if(rect2.cor == '')
    {   
        //Check that prevents user to choose the 
        //same square
        if(rect1.line == square.line && 
            rect1.column == square.column)  return;
 
        //Assigns values ​​to object rect1
        rect2.cor = colors[square.line][square.column];
        rect2.column = square.column;
        rect2.line = square.line;   
        //Paint the square as its line position , column 
        //and its color         
        paintSquare(rect2); 
 
        //Function that compares the two squares 
        //and wait 1 second to continue
        setTimeout(compare, 1000);      
    }       
}
 
function paintSquare(r) 
{
    //Square color
    ctx.fillStyle = r.cor;
    //x-coordinate , y-coordinate
    //square width, height in pixels
    ctx.fillRect((kPieceHeight*r.column)+1,
        (kPieceWidth*r.line)+1,kPieceWidth-1,kPieceHeight-1);
}
 
function compare() 
{           
    //Colors are different ? then
    if(rect1.cor != rect2.cor)
    {
        //the values ​​of the squares in the matrix control
        // and objects received #fff (null for us )
        matrix[rect1.line][rect1.column] = matrix[rect2.line][rect2.column] = rect1.cor = rect2.cor = '#fff';
        //Painting the squares with white because 
        //they are differents
        paintSquare(rect1);             
        paintSquare(rect2);
    }
    else
    {
        //They are equal , so we updated the matrix control
        //positions with their values ​​(hex color )
        matrix[rect1.line][rect1.column] = matrix[rect2.line][rect2.column] = rect1.cor;
    }
    //Increase the number of moves
    moves++;
    //Reset values ​​of the objects
    rect1 = new Square();
    rect2 = new Square();
    //and check game state
    checkGameState();
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
    //if any #fff value is found in the control matrix means
    //hat the game is not over
    //and there are squares to be found , end get false;
    for (var l = 0; l < kBoardHeight; l++) 
        for (var c = 0; c < kBoardWidth; c++)        
            if (matrix[l][c] == '#fff') end = false;    
 
    // if end is true, then show game message over
    if(end)
    {       
        ctx.fillRect(0,0,(kBoardWidth*kPieceWidth),
            (kBoardHeight*kPieceHeight));
        ctx.fillStyle = "#fff";
        ctx.font = "30px verdana";                  
        ctx.fillText("Game Over!", 
            (kBoardWidth*kPieceWidth)*0.25, (kBoardHeight*kPieceHeight)/2);
        ctx.font = "20px verdana";
        ctx.fillText("Moves:"+ moves,
            (kBoardWidth*kPieceWidth)*0.35,(kBoardHeight*kPieceHeight)*0.60);
    }               
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
    refresh(); 
    other();  
}

function other(){
    alert("Othe");
}

function drawWater(){
    alert("Draw Water");
    refresh();
}

function refresh(){
    alert("RRR");
    setTimeout(function(){
        drawWater();
    }, 500);
}
