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

	switch(code){
		case 2:
			pipeGrid.nodes[x - 1][y][1] = new Node(x + 1, y)
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = new Node(x - 1, y);
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 3:
			pipeGrid.nodes[x - 1][y][1] = null
			pipeGrid.nodes[x][y][1] = new Node(x, y + 1);
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = new Node(x, y - 1);
			break;
		case 4:
			pipeGrid.nodes[x - 1][y][1] = new Node(x, y + 1);
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = new Node(x - 1, y);
			break;
		case 5:
			pipeGrid.nodes[x - 1][y][1] = new Node(x, y - 1);
			pipeGrid.nodes[x][y][1] = new Node(x - 1, y);
			pipeGrid.nodes[x + 1][y][0] = null;
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 6:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = new Node(x + 1, y);
			pipeGrid.nodes[x + 1][y][0] = new Node(x, y - 1);
			pipeGrid.nodes[x][y + 1][0] = null;
			break;
		case 7:
			pipeGrid.nodes[x - 1][y][1] = null;
			pipeGrid.nodes[x][y][1] = null;
			pipeGrid.nodes[x + 1][y][0] = new Node(x, y + 1);
			pipeGrid.nodes[x][y + 1][0] = new Node(x + 1, y);
			break;
	}

}