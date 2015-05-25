/* This function is called after block change. 
** is responsible for updating connection state (avaiable paths).
** left and top neighbours are at index [0]        (nodes[*][*][1])
** right and bottom neighbour are at index [1]     (nodes[*][*][1])
*/
function modifyConnections(field, code){
	/* Position of field center in pipeGrid (nodes coordinares)*/
	var center = pipeGrid.toNodeCoordinates(field);
	var X = center.X;
	var Y = center.Y;

	/*X będzie się zmieniał tak jak w każdym a Y tylko dla dolnego elementu będzie większy.*/
	var leftTab = pipeGrid.arrayIndexesFromNodes(X - 1, Y);
	var x = leftTab.X + 1; //reverting co center;
	var y = leftTab.Y;

	//alert("Modification of suround node: X = " + X + ", Y = " + Y);
	//alert("Array position of left node: x = " + x + ", y = " + y);

	switch(code){
		/*For flood field*/
		case 1:
			//alert("Lock on filed X = " + field.X + " Y = " + field.Y);
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 2:
			pipeGrid.nodes[x - 1][y][1] = new Node(X + 1, Y);
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = new Node(X - 1, Y);
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 3:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = new Node(X, Y + 1);
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = new Node(X, Y - 1);
			break;
		case 4:
			pipeGrid.nodes[x - 1][y][1] = new Node(X, Y + 1);
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = new Node(X - 1, Y);
			break;
		case 5:
			pipeGrid.nodes[x - 1][y][1] = new Node(X, Y - 1);
			pipeGrid.nodes[x][y][1] = new Node(X - 1, Y);
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 6:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = new Node(X + 1, Y);
			pipeGrid.nodes[x + 1][y][0] = new Node(X, Y - 1);
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 7:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = new Node(X, Y + 1);
			pipeGrid.nodes[x][y + 1][0] = new Node(X + 1, Y);
			break;
		case 8:
			pipeGrid.nodes[x - 1][y][1] = new Node(X, Y);
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 9:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = new Node(X, Y);
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 10:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = new Node(X, Y);
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 11:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = new Node(X, Y);
			break;

	}

	/*switch(code){
		case 2:
			pipeGrid.nodes[y][x - 1][1] = new Node(X + 1, Y)
			pipeGrid.nodes[y][x][1] = null;
			pipeGrid.nodes[y][x + 1][0] = new Node(X - 1, Y);
			pipeGrid.nodes[y + 1][x][0] = null;
			break;
		case 3:
			pipeGrid.nodes[y][x - 1][1] = null
			pipeGrid.nodes[y][x][1] = new Node(X, Y + 1);
			pipeGrid.nodes[y][x + 1][0] = null;
			pipeGrid.nodes[y + 1][x][0] = new Node(X, Y - 1);
			break;
		case 4:
			pipeGrid.nodes[y][x - 1][1] = new Node(X, Y + 1);
			pipeGrid.nodes[y][x][1] = null;
			pipeGrid.nodes[y][x + 1][0] = null;
			pipeGrid.nodes[y + 1][x][0] = new Node(X - 1, Y);
			break;
		case 5:
			pipeGrid.nodes[y][x - 1][1] = new Node(X, Y - 1);
			pipeGrid.nodes[y][x][1] = new Node(X - 1, Y);
			pipeGrid.nodes[y][x + 1][0] = null;
			pipeGrid.nodes[y + 1][x][0] = null;
			break;
		case 6:
			pipeGrid.nodes[y][x - 1][1] = null;
			pipeGrid.nodes[y][x][1] = new Node(X + 1, Y);
			pipeGrid.nodes[y][x + 1][0] = new Node(X, Y - 1);
			pipeGrid.nodes[y + 1][x][0] = null;
			break;
		case 7:
			pipeGrid.nodes[y][x - 1][1] = null;
			pipeGrid.nodes[y][x][1] = null;
			pipeGrid.nodes[y][x + 1][0] = new Node(X, Y + 1);
			pipeGrid.nodes[y + 1][x][0] = new Node(X + 1, Y);
			break;
		case 8:
			pipeGrid.nodes[y][x - 1][1] = new Node(X, Y);
			pipeGrid.nodes[y][x][1] = null;
			pipeGrid.nodes[y][x + 1][0] = null;
			pipeGrid.nodes[y + 1][x][0] = null;
			break;
		case 9:
			pipeGrid.nodes[y][x - 1][1] = null;
			pipeGrid.nodes[y][x][1] = new Node(X, Y);
			pipeGrid.nodes[y][x + 1][0] = null;
			pipeGrid.nodes[y + 1][x][0] = null;
			break;
		case 10:
			pipeGrid.nodes[y][x - 1][1] = null;
			pipeGrid.nodes[y][x][1] = null;
			pipeGrid.nodes[y][x + 1][0] = new Node(X, Y);
			pipeGrid.nodes[y + 1][x][0] = null;
			break;
		case 11:
			pipeGrid.nodes[y][x - 1][1] = null;
			pipeGrid.nodes[y][x][1] = null;
			pipeGrid.nodes[y][x + 1][0] = null;
			pipeGrid.nodes[y + 1][x][0] = new Node(X, Y);
			break;

	}*/

	/*try{
		alert("Left X = " + pipeGrid.nodes[x - 1][y][1].X + ", Y = " + pipeGrid.nodes[x - 1][y][1].Y);
	}catch(err){}

	try{
		alert("Top X = " + pipeGrid.nodes[x][y][1].X + ", Y = " + pipeGrid.nodes[x][y][1].Y);
	}catch(err){}

	try{
		alert("Right X = " + pipeGrid.nodes[x + 1][y][0].X + ", Y = " + pipeGrid.nodes[x + 1][y][0].Y);
	}catch(err){}

	try{
		alert("Bottom X = " + pipeGrid.nodes[x][y + 1][0].X + ", Y = " + pipeGrid.nodes[x][y + 1][0].Y);
	}catch(err){}*/

}