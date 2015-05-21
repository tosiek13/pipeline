/* Creating board */
function initGame(){
    board = new Board(boardCanvas, 15, 20);
    board.createBoard();

    //Queue building, holds next available blocks;
    queue = new Queue(queueCanvas, 5, board.getFieldHeight(), board.getFieldWidth() );
    queue.fillBuffer();
}