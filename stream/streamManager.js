/*Powoduje zainicjowanie strumieni*/
function initStreams(amount){
	streams = [];

	//Coordinates of field - start/ends of streams.
	var X = generateArrayWithUniqueValuesFromRange(0, boardHeight, 2 * amount);
	var Y = generateArrayWithUniqueValuesFromRange(0, boardWidth, 2 * amount);

	/* Creating streams one in iteration*/
	for(var i = 0; i < 2*amount; i+=2){
		//alert("beg (FIELD):, X = " + X[i] + ", Y = " + Y[i]);
		//alert("X[0] = " + X[0] + "Y[0] = " + Y[0] + "X[2] = " + X[2] + "Y[2] = " + Y[2]);
		//Tworze węzeł (z centrum).
		var begField = new Field(X[i], Y[i]);
		// i przeliczam go na współrzędne siatki.
		var begGrid = pipeGrid.toNodeCoordinates(begField);
		//Ustalam kierunek strumienia a także wpółrzęnde brzego pola
		var begDirection = generateDirectionCoordinates(begGrid);

		//Tworzę węzeł końcowy
		var endField = new Field(X[i+1], Y[i+1]);
		//Przeliczam na współrzędne siatki
		var endGrid = pipeGrid.toNodeCoordinates(endField);
		//Wyznaczam kierunek strumienia a także współrzędne brzegu pola
		var endDirection = generateDirectionCoordinates(endGrid);


				//Upewni się, że endGeig to end Grid - centrum pola 
		var stream = new Stream(begGrid, begDirection[0], endGrid, colors[i], fieldSize * 25/100);
		streams.push(stream);
		
		//SETTING BOARD STATE

		//BEG element
		//Setting neighbour state
		modifyConnections(begField, begDirection[1]);
		//Setting board field state
		board.setFieldState(begField, 1);
		//Drowing element
		board.drawBlock(begField, begDirection[1]);

		//END element
		//Serring neighbour grid nodes state
		modifyConnections(endField, endDirection[1]);
		//
		board.setFieldState(endField, 0);
		//Drowing element on board
		board.drawBlock(endField, endDirection[1]);
	}

	/* Starting streams */
	for(var i = 0; i < streams.length; i++){
		//alert("initialization of stream " + i);
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

		if ( !isInBorder(nextX, nextY)){
			//alert("X = " + X + ", Y = " + Y + "Enge X = " +  nextX + ", Enge Y = " + nextY + ", code" + code);
			return new Array(new Node(nextX, nextY), code);
		}
		//alert("In board: X = " + X + ", Y = " + Y + "Enge X = " +  nextX + ", Enge Y = " + nextY + ", code" + code);
	}
}

/* Checks weather the node lay on boarder of board X, Y grid coordinates */
function isInBorder(X, Y){
	alert(2 * boardHeight - 1);
	alert( 2 * boardWidth - 1);
	if( (X < 1) || (Y < 1) || (X > (2 * boardWidth - 1)) || (Y > ( 2 * boardHeight - 1)))
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