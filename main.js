/* Creating board */
function initGame(){
	//Loading images
    images = new Images();
    images.load();


    board = new Board(boardCanvas, 4, 3);
    board.createBoard();

    //Queue building, holds next available blocks;
    queue = new Queue(queueCanvas, 5, board.getFieldHeight(), board.getFieldWidth() );
    queue.fillBuffer();

    pipeGrid = new PipeGrid(boardCanvas);
    pipeGrid.createNodes();
    pipeGrid.paint();

    /*var inA = pipeGrid.getNeighbours(1, 0);
    alert("x = " + inA.X + " y = " + inA.Y);*/
}