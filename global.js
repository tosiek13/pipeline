var boardCanvas = document.getElementById("board");
var queueCanvas = document.getElementById("queue");

/*Amount of block types*/
var blocksAmount = 6;

/* Colors of fluid */
var colors = ['blue', 'green', 'red'];

/* Ustawienie wymiarów planczy - liczba pól na szerokość i w pionie. */
var boardWidth = 8;
var boardHeight = 8;

/* Ustawienie szerokości planczy - stała, a wysokośc dopasowuje się tak, żeby pola były kwadratowe. */
boardCanvas.width = 600;			
boardCanvas.height = 600 * boardHeight / boardWidth;
/* Wyższe ustawienia determinują wielkość kwadratowego bloczka (pola) */
var fieldSize = boardCanvas.width / boardWidth;

queueCanvas.width = 5 * fieldSize;
queueCanvas.height = fieldSize;