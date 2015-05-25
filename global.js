var boardCanvas = document.getElementById("board");
var queueCanvas = document.getElementById("queue");

/*Amount of block types*/
var blocksAmount = 6;

/* Colors of fluid */
var colors = ['blue', 'green', 'red', 'grey', 'orange', 'purple', 'black', 'pink'];

/* Ustawienie wymiarów planczy - liczba pól na szerokość i w pionie. */
var boardWidth = 10;
var boardHeight = Math.floor(boardWidth * 10 / 16);

/* Ustawienie szerokości planczy - stała, a wysokośc dopasowuje się tak, żeby pola były kwadratowe. */
var boardContainer = document.getElementById("boardContainer");
boardCanvas.width = boardContainer.clientWidth * 0.8;		
boardCanvas.height = boardCanvas.width * boardHeight / boardWidth;
/* Wyższe ustawienia determinują wielkość kwadratowego bloczka (pola) */
var fieldSize = boardCanvas.width / boardWidth;

var queueFieldSize = boardCanvas.width * 0.1;
queueCanvas.width = 5 * queueFieldSize;
queueCanvas.height = queueFieldSize;

var gameFlag = true;