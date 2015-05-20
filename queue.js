//Identifying canvas element
var queueC = document.getElementById("queue");

var ctxQueue = queueC.getContext("2d");

var BUFFER_SIZE = 5;


queueC.width = BUFFER_SIZE * kPieceWidth;
queueC.height = kPieceHeight;


function fillBuffer(){
	for(var i  = 0; i<BUFFER_SIZE; i++){
		indexes[i] = getIndex();
	}
	printBuffer();
}

function getNextBlock(){
	 nextIndex = indexes.shift();
	 indexes.push(getIndex());
	 printBuffer();

	 return nextIndex;
}

function printBuffer(){
	for(var i  = 0;i<BUFFER_SIZE; i++){
		ctxQueue.drawImage(getNextImage(indexes[i]) , i * kPieceWidth, 0, kPieceWidth, kPieceHeight);
	}
}

function getNextImage(code){ 
    switch(code){
        case 0:
            return straight;
        case 1:
            return uband;
        case 2:
            return cross;
    }
}

function getIndex(){
    return Math.floor((Math.random() * 3));
}