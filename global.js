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

var BufferSize = 5;