/* Funkcja obsługująca zdarzenia związane z kliknięciem na płótnie. */
function clickHandler(e) {
    //Geting field that was clicked
    var field = getField(e);
     
    //Paints the current block on specified field
    paintBlock(field);
}
 
 /* Paints the current block on specified field */
function paintBlock(field) {
    if (true){//check weather the click was in tighr place.
        nextImage = queue.getNextBlock();
    }
    board.drawCurrentBlock(field);
}
 
 /* gets the field, thatwas cliecked */
function getField(e) {
    //Uwzględnienie przesunięcia canvasu na stronie względem (0, 0)
    var x;
    var y;
 
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else{
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= boardCanvas.offsetLeft;
    y -= boardCanvas.offsetTop;
    x = Math.min(x, boardCanvas.width);
    y = Math.min(y, boardCanvas.height);
 
    //alert("x = " + x + ", y = " + y);
    return new Field(Math.floor(y/board.getFieldHeight()), Math.floor(x/board.getFieldWidth()));
}