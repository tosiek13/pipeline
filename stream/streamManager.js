/*Powoduje zainicjowanie strumieni*/
function initStreams(amount){
	streams = [];

	//Coordinates of field - start/ends of streams.
	var X = generateArrayWithUniqueValuesFromRange(0, boardHeight, 2 * amount);
	var Y = generateArrayWithUniqueValuesFromRange(0, boardWidth, 2 * amount);

	/* Creating streams one in iteration*/
	for(var i = 0; i<2 * amount; i+=2){
		alert("creating Stream");
		//alert("beg (FIELD):, X = " + X[i] + ", Y = " + Y[i]);

		//Tworze węzeł (z centrum) i przeliczam go na współrzędne siatki.
		var begField = new Node(X[i], Y[i]);
		var begGrid = pipeGrid.toNodeCoordinates(begField);
		//Ustalam kierunek.
		var begDirection = generateDirectionCoordinates(begGrid);

		var endGrid = pipeGrid.toNodeCoordinates(new Node(X[i+1], Y[i+1]));
		var endDirection = generateDirectionCoordinates(endGrid);
		var stream = new Stream(begGrid, begDirection[0], endDirection[0],'blue'/* colors[i]*/, fieldSize * 25/100);
		streams.push(stream);
		
		//Setting board state
		modifyConnections(begField, begDirection[1]);
		board.drawBlock(begField, begDirection[1]);

		var endNode = new Node(X[i+1], Y[i+1]);
		modifyConnections(endNode, endDirection[1]);
		board.drawBlock(endNode, begDirection[1]);
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
function generateDirectionCoordinates(gridNode){
	var X = gridNode.X;
	var Y = gridNode.Y;

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
			return new Array(new Node(nextX, nextY), code);
	}
}

/* Checks weather the node lay on boarder of board X, Y grid coordinates */
function isInBorder(X, Y){
	if( X == 0 || Y == 0 || X > (2 * boardHeight) || Y > ( 2* boardWidth))
		return true;
	return false;
}

/* Generates unique integers from range [beg, end) */
function generateArrayWithUniqueValuesFromRange(beg, end, amount){
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