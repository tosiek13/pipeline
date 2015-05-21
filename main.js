/*Creating global objects*/
var boardPainter = new BoardPainter(ctx);
var queue = new Queue(5);

var fields = new Array();

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

    //Queue building, holds next available blocks;
    var queueC = document.getElementById("queue");
    var ctxQueue = queueC.getContext("2d");
    queue = new Queue(queueC, BufferSize);
    queue.fillBuffer();
}