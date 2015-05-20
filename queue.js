//Identifying canvas element
var queueC = document.getElementById("queue");

var ctxQueue = queueC.getContext("2d");

function Queue(size){
	this.size = size;					//ilość elementów w kolejce
	this.width = size * kPieceWidth; 	//szerokość płótna
	this.height = kPieceHeight; 		//wysokość płótna
	this.array = new Array();
	//Seting canvas
	queueC.width = this.width;
	queueC.height =this.height;
}

Queue.prototype.fillBuffer = function(){
	for(var i  = 0; i<this.size; i++){
		this.array[i] = this.getIndex();
	}
	this.printBuffer();
}

Queue.prototype.getNextBlock = function(){
	 nextIndex = this.array.shift();
	 this.array.push(this.getIndex());
	 this.printBuffer();

	 return nextIndex;
}

Queue.prototype.printBuffer = function(){
	for(var i  = 0;i<this.size; i++){
		ctxQueue.drawImage(this.getNextImage(this.array[i]) , i * kPieceWidth, 0, kPieceWidth, kPieceHeight);
	}
}

Queue.prototype.getNextImage = function(code){ 
    switch(code){
        case 0:
            return straight;
        case 1:
            return uband;
        case 2:
            return cross;
    }
}

Queue.prototype.getIndex = function(){
    return Math.floor((Math.random() * 3));
}