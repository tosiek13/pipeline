/* Creating board */
function initGame(){
    board = new Board(boardCanvas, 3, 4);
    board.createBoard();

    //Queue building, holds next available blocks;
    queue = new Queue(queueCanvas, 5, board.getFieldHeight(), board.getFieldWidth() );
    queue.fillBuffer();

    pipeGrid = new PipeGrid(boardCanvas);
    pipeGrid.paint();
    pipeGrid.createNodes();
}