/* Funkcja obsługująca zdarzenia związane z kliknięciem na płótnie. */
function clickHandler(e) {
    //Geting field that was clicked
    var field = getField(e);

    //Check weather this field is active
    if ( board.isActive(field)){
        //alert("Can be modify.");

        var nextBlockCode = queue.spyQueue();
        board.setFieldState(field, nextBlockCode);
        modifyConnections(field, nextBlockCode);

        //Paints the current block on specified field
        var nextImage = queue.getNextBlock();
        paintBlock(field, nextImage);
    }else{
         //alert("Unmod element.");
    }
}
 
 /* Paints the current block on specified field */
function paintBlock(field, image) {
    board.drawBlock(field, image);
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
    
    return new Field(Math.floor(y/fieldSize), Math.floor(x/fieldSize));
}