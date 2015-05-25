/* Creating board */
function initGame(){

    images = new Images();
    images.load();

    setTimeout(play, 500);

    setButtons();
}

function play(){
    var ctx = boardCanvas.getContext('2d');
    ctx.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
    board = new Board(boardCanvas, boardHeight, boardWidth);
    board.createBoard();

    //Queue building, holds next available blocks;
    queue = new Queue(queueCanvas, 5);
    queue.fillBuffer();

    pipeGrid = new PipeGrid(boardCanvas);
    pipeGrid.createNodes();


    begTime = 10000;
    fieldTime = 5000;
    initStreams(2, begTime, fieldTime);
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


function speedUp(){
    for(var i = 0; i<streams.length; i++){
        streams[i].modifyPace(5);
    }
}

function setButtons(){
    var speedButton = document.getElementById("speedUp");
    speedButton.addEventListener("click", speedUp);

    var restartButton = document.getElementById("restarGame");
    restartButton.addEventListener("click", restart);
}

function restart(){
    if (confirm("Are you sure you want to restart game !!"))
        location.reload();
}