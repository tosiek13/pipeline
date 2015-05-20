//Adding click listener - when user click on board.
cBoard.addEventListener("click", clickHandler);

 
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
        nextImage = getNextBlock();
    }
    //alert("Painting block" + field.y + " " + field.x);
    ctx.drawImage(getNextImage(nextImage),field.x, field.y, kPieceWidth, kPieceHeight);
}

function jpg(code){
    switch(code){
        case 0:
            return straight;
        case 1:
            return uband;
        case 2:
            return cross;
    }
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

    x -= c.offsetLeft;
    y -= c.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
 
    //alert("x = " + x + ", y = " + y);
    return new Field(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
}

function Field(y, x){
    this.X = x;
    this.Y = y;
    this.x = x * kPieceWidth;
    this.y = y * kPieceHeight;
}