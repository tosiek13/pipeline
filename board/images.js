//images
straight = new Image();
straight.src = "../images/straight.jpg";

uband = new Image();
uband.src = "../images/uband.jpg";

cross = new Image();
cross.src = "../images/cross.jpg";


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