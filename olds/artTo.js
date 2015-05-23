function Arc(XBeg, YBeg, XEnd, YEnd){
    var begCoor = nodeToPixels(XBeg, YBeg);
    this.xBeg = begCoor.X;
    this.yBeg = begCoor.Y;

    this.xCenter;
    this.yCenter;
    this.xEnd;
    this.yEnd;
    this.radius = board.getFieldHeight();

    this.initilize(XBeg, YBeg, XEnd, YEnd);
}

Arc.prototype.draw = function(self, animator){
    alert("drawing arc")
    if (animator.percent <= 1){
        animator.ctx = animator.canvas.getContext("2d");
        animator.ctx.beginPath();
        
        animator.ctx.moveTo(this.xBeg, this.yBeg);
        animator.ctx.arcTo(this.xCenter, this.yCenter, this.xEnd, this.yEnd, this.radius);

        animator.ctx.lineWidth = self.width;
        animator.ctx.strokeStyle = self.color;
        animator.ctx.stroke();
        animator.percent += animator.step;
    }else{
        animator.endPainting(animator);
    }
}

Arc.prototype.initilize = function(XBeg, YBeg, XEnd, YEnd){
    //Setting center
    var XDiff;
    var YDiff;
    if( XBeg%2 == 0){
        XDiff = XEnd - XBeg;
        YDiff = 0;
    }else{
        XDiff = 0;
        YDiff = YEnd - YBeg;
    }
    var centerCoor = nodeToPixels(XBeg + XDiff, YBeg + YDiff);
    this.xCenter = centerCoor.X;
    this.yCenter = centerCoor.Y;

    //SettingEnd
    var endCoor = nodeToPixels(XEnd, YEnd);
    this.xEnd = endCoor.X;
    this.yEnd = endCoor.Y;
}