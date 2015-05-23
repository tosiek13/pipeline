/* Creating board */
function initGame(){
    alert("init");
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

    //initStream();
    var arc = new Arc(3, 4, 2, 5, 4);

    ctx = boardCanvas.getContext("2d");
    ctx.beginPath();
        
    ctx.arc(arc.xCenter, arc.yCenter, arc.radius, arc.angleBeg, arc.angleEnd);
        //animator.ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'green';
    ctx.stroke();


    /*var inA = pipeGrid.getNeighbours(1, 0);
    alert("x = " + inA.X + " y = " + inA.Y);*/
}