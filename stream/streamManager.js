/*Powoduje zainicjowanie strumieni*/
function initStream(){
	var field = new Field(1, 1);
	code = 2;
	modifyConnections(field, code);
	//paintBlock(field, images.);
	board.drawBlock(field, code);

	var stream = new Stream(2, 3, 4, 3, 'blue', 5);
	stream.init();
}