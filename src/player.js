var Player = {};

const acceleration = 3;
const maxSpeed = 15;

Player.init = function(ctxt){
    this.context = ctxt;

    this.width = 64;
    this.height = 39;
    this.image = new Image();
    this.image.src = "resources/wizard.jpg";
    this.xPos = 0;
    this.yPos = 0;
    this.vx = 0;
    this.vy = 0;
}

Player.update = function(){
    //Update location
    if(this.vx > maxSpeed){
        this.vx = maxSpeed;
    }
    if(this.vy > maxSpeed){
        this.vy = maxSpeed;
    }

    this.xPos += this.vx;
    this.yPos += this.vy;

    //Check bounds
    if( this.xPos < 0){
        this.xPos = 0;
        this.vx = 0;
    }
    else if( this.yPos < 0){
        this.yPos = 0;
        this.vy = 0;
    }
    if( this.xPos > (240-this.width)){
        this.xPos = 240-this.width;
        this.vx = 0;
    }
    else if( this.yPos > (480-this.height)){
        this.yPos = 480-this.height;
        this.vy = 0;
    }

    //Friction
    this.vx *= .97;
    this.vy *= .97;
}

Player.draw = function(){
    this.context.drawImage(Player.image, this.xPos, this.yPos);
}

Player.moveLeft = function(){
    this.vx -= acceleration;
}
Player.moveUp = function(){
    this.vy -= acceleration;
}
Player.moveRight = function(){
    this.vx += acceleration;
}
Player.moveDown = function(){
    this.vy += acceleration;
}