/*Powoduje zainicjowanie strumieni*/
function initStreams(amount){
	streams = [];

	var X = generateArrayWithUniqueValuesFromRange(0, boardHeight, 2 * amount);
	var Y = generateArrayWithUniqueValuesFromRange(0, boardWidth, 2 * amount);

	/* Creating streams one in iteration*/
	for(var i = 0; i<2 * amount; i+=2){
		alert("creating Stream");
		var begDirection = generateDirectionCoordinates(X[i], Y[i]);
		var endDirection = generateDirectionCoordinates(X[i+1], Y[i+1]);
		var stream = new Stream(X[i], Y[i], begDirection[0], begDirection[1], endDirection[0], endDirection[1], colors[i], 4);
		streams.push(stream);
		
		//Setting board state
		var begNode = new Node(X[i], Y[i])
		modifyConnections(begNode, begDirection[2]);
		board.drawBlock(begNode, begDirection[2]);

		var endNode = new Node(X[i+1], Y[i+1]);
		modifyConnections(endNode, endDirection[2]);
		board.drawBlock(begNode, begDirection[2]);
	}

	/* Starting streams */
	for(var i = 0; i < streams.length; i++){
		alert("initialization of stream " + i);
		streams[i].init();
	}
}

/* Returns coordinates of the rangom edge of block in which stream.
* This function do it safety (not block the stream beg/end with wall)
* returns Array [NextX, NextY, code] //code - kod elementu.
**/
function generateDirectionCoordinates(X, Y){
	while(true){
		var code = intFromRange(8, 12);
		var nextX;
		var nextY;
		switch(code){
			case 8:
				nextX = X - 1;
				nextY = Y;
				break;
			case 9:
				nextX = X;
				nextY = Y - 1;
				break;
			case 10:
				nextX = X + 1;
				nextY = Y;
				break;
			case 11:
				nextX = X;
				nextY = Y + 1;
				break;
		}
		if ( !isInBorder(nextX, nextY))
			return new Array(nextX, nextY, code);
	}
}

/* Checks weather the node lay on boarder of board */
function isInBorder(X, Y){
	if( X < 0 || Y < 0 || X > boardHeight || Y > boardWidth)
		return true;
	return false;
}

/* Generates unique integers from range [beg, end) */
function generateArrayWithUniqueValuesFromRange(amount, beg, end){
	if((beg - end) > amount){
		alert("Cannot generate so meny unique integers from this range.");
	}
	var array = new Array(amount);
	var i = 0;

	while(i < amount){
		//alert(i + "generating Array from range.");
		var next = intFromRange(beg, end);
		var isUnique = true;
		for(var j = 0; j<i; j++){
			if(array[j] == next)
				isUnique = false;
		}
		if (isUnique)
			array[i++] = next;
	}

	return array;
}

/* Returns the int from range (beg, end] */
function intFromRange(beg, end){
	return Math.floor((Math.random() * (end - beg))) + beg;
}