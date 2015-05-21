/*
* Object that represents Queue of avaiable block.
*** @param canvas - plece where queue will be displayed
*** @param size - length of queue (amount of elements)
*
* This object facilitates all necessary methods,
* including printing himself.
*/
function Queue(canvas, size, fieldHeight, fieldWidth){
	this.canvas = canvas;				
	this.size = size;
	this.width = size * fieldWidth; 	//szerokość płótna w px
	this.height = fieldHeight; 		//wysokość płótna w px
	this.array = new Array();			//Holds codes of blocks in queue
	//Seting canvas size
	canvas.width = this.width;			
	canvas.height =this.height;
}

//Initialization method
Queue.prototype.fillBuffer = function(){
	for(var i  = 0; i<this.size; i++){
		this.array[i] = this.getIndex();
	}
	this.printBuffer();
}

/*Moves the queue forward end returns first element from queue*/
Queue.prototype.getNextBlock = function(){
	 nextIndex = this.array.shift();
	 this.array.push(this.getIndex());
	 this.printBuffer();

	 return nextIndex;
}

/*Prints current buffer content on canvas*/
Queue.prototype.printBuffer = function(){
	for(var i  = 0;i<this.size; i++){
		var blockWidth = board.getFieldWidth();
		this.canvas.getContext("2d").drawImage(getImage(this.array[i]) , i * blockWidth , 0, this.height, blockWidth);
	}
}
 
/*Returns random block (it's code reprezentation)*/
Queue.prototype.getIndex = function(){
    return Math.floor((Math.random() * blocksAmount));
}