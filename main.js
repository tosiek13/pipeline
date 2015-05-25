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

    initStreams(2);
}

function setGameState(gameState){
    switch(gameState){
        case 1:
            alert("Congratulation you complated the game !!!");
            gameFlag = false;
            break;
        case 2:
            alert("You lose ;>");
            gameFlag = false;
            break;
        case 3:
            alert("Next level");
            gameFlag = false
            break;
    }
    boardCanvas.removeEventListener("click", clickHandler);
}

function checkEndOfGameConditions(){
    if(streams.length == 0){
        setGameState(1);
    }
}