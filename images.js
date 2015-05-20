//images
straight = new Image();
straight.src = "straight.jpg";

uband = new Image();
uband.src = "uband.jpg";

cross = new Image();
cross.src = "cross.jpg";


getImage = function(code){ 
    switch(code){
        case 0:
            return straight;
        case 1:
            return uband;
        case 2:
            return cross;
    }
}