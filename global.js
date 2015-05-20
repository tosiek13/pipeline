//Identifying canvas element
var cBoard = document.getElementById("canvas");
var ctx = cBoard.getContext("2d");

//Number of squares horizontally & vertically [ 4x4 ]
var kBoardWidth = 20;
var kBoardHeight= 15;
//Height and width of the square
var kPieceWidth = cBoard.width / kBoardWidth;
var kPieceHeight= cBoard.height / kBoardHeight;
 
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var boardPainter = new BoardPainter(ctx);


//images
straight = new Image();
straight.src = "straight.jpg";

uband = new Image();
uband.src = "uband.jpg";

cross = new Image();
cross.src = "cross.jpg";

//indeksy z kolejki
var indexes = new Array();


/* Creating board */
function initGame(){
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
 
    //Initializing Board with Fields
    for (var row = 0; row < kBoardHeight; row++) {
        //multidimensional array[line x column]
        fields[row] = new Array();
        for (var col = 0; col < kBoardWidth; col++) {
            fields[row][col] = new Field(row, col);
        }
    }

    fillBuffer();
}