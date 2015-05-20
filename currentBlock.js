c.addEventListener("mousemove", moveBlock);

function moveBlock(e){

    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

    x -= c.offsetLeft;
    y -= c.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);

    ctx.drawImage(nextImage,x - kPieceHeight/2, y - kBoardHeight/2, kPieceWidth, kPieceHeight);
}