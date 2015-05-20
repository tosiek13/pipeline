//Retrieves the context to be drawn or null if not 
//supported by the browser
var ctx = c.getContext("2d");
//Assigning squareClick() function to click on canvas
c.addEventListener("click", clickHandler);

//Control matrix that will make the checks later
var fields = new Array();
 
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
 
/* Creating board */
function initGame(){
    //vertical lines
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) 
    {
        ctx.moveTo(0.5 + x, 0);
        ctx.lineTo(0.5 + x, kPixelHeight);
    }
     
    //horizontal lines
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) 
    {
        ctx.moveTo(0, 0.5 + y);
        ctx.lineTo(kPixelWidth, 0.5 +  y);
    }
 
    //Painting on canvas
    ctx.strokeStyle = "#6C7A89";
    ctx.stroke();
 
    //Initializing Board with Fields
    for (var row = 0; row < kBoardHeight; row++) {
        //multidimensional array[line x column]
        fields[row] = new Array();
        for (var col = 0; col < kBoardWidth; col++) {
            fields[row][col] = new Field(row, col);
        }
    }

    fillBuffer();
}

function Field(y, x){
    this.X = x;
    this.Y = y;
    this.x = x * kPieceWidth;
    this.y = y * kPieceHeight;
}