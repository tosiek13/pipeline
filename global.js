//Identifying canvas element
var c = document.getElementById("canvas");

//Number of squares horizontally & vertically [ 4x4 ]
var kBoardWidth = 20;
var kBoardHeight= 15;
//Height and width of the square
var kPieceWidth = c.width / kBoardWidth;
var kPieceHeight= c.height / kBoardHeight;
 
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);


//images
straight = new Image();
straight.src = "straight.jpg";

uband = new Image();
uband.src = "uband.jpg";

cross = new Image();
cross.src = "cross.jpg";

//indeksy z kolejki
var indexes = new Array();