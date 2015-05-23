/* Creating board */
function initGame(){
    alert("init");

	//Loading images
    images = new Images();
    images.load();


    board = new Board(boardCanvas, boardHeight, boardWidth);
    board.createBoard();

    //Queue building, holds next available blocks;
    queue = new Queue(queueCanvas, 5, board.getFieldHeight(), board.getFieldWidth() );
    queue.fillBuffer();

    pipeGrid = new PipeGrid(boardCanvas);
    pipeGrid.createNodes();
    //pipeGrid.paint();

    initStreams(2);
    //var arc = new Arc(4, 3, 3, 2, 4);
    //new Animation(boardCanvas, arc, 3000, 30, this);
}