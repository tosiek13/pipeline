/* Creating board */
function initGame(){
    images = new Images();
    images.load();

    board = new Board(boardCanvas, boardHeight, boardWidth);
    board.createBoard();

    setTimeout(play, 500);

}

function play(){

    //Queue building, holds next available blocks;
    queue = new Queue(queueCanvas, 5, board.getFieldHeight(), board.getFieldWidth() );
    queue.fillBuffer();

    pipeGrid = new PipeGrid(boardCanvas);
    pipeGrid.createNodes();

    initStreams(1);
}