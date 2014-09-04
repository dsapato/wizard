var Player = {};

const acceleration = 3;
const maxSpeed = 5;
const SCREEN_POSITION_Y = 220;

Player.init = function(ctxt){
    this.context = ctxt;

    this.width = 51;
    this.height = 33;
    this.image = new Image();
    this.image.src = "resources/wizard.png";
    this.lifeImage = new Image();
    this.lifeImage.src = "resources/life.png";
    this.xPos = 20;
    this.yPos = 0;
    this.yOffset = 0 - SCREEN_POSITION_Y;
    this.vx = 0;
    this.vy = 0;
    this.hurt = false;
    this.numLives = 3;
}

Player.update = function(){
    this.hurt = false;

    //Update location
    if(this.vx > maxSpeed){
        this.vx = maxSpeed;
    }
    if(this.vy > maxSpeed){
        this.vy = maxSpeed;
    }
    else if(this.vy < 0 - maxSpeed){
        this.vy = 0 - maxSpeed
    }

    this.xPos += this.vx;
    this.yPos += this.vy;
    this.yOffset = this.yPos - SCREEN_POSITION_Y;

    //Check bounds
    if( this.xPos < 0){
        this.xPos = 0;
        this.vx = 0;
    }
    if( this.xPos > (640-this.width)){
        this.xPos = 640-this.width;
        this.vx = 0;
    }

    //Friction
    this.vx *= .97;
    this.vy *= .97;
}

Player.draw = function(){
    this.context.drawImage(Player.image, this.xPos, SCREEN_POSITION_Y);
    for (var i = 0; i < this.numLives; i++) {
        this.context.drawImage(Player.lifeImage, 260 + 40*i, 20);
    }
}

Player.hit = function(){
    this.hurt = true;
    this.numLives--;
    if(this.numLives < 1){
        Game.state = Game.states.DEAD;
    }
}

Player.addLife = function(){
    this.numLives++;
    if(this.numLives > 3){
        this.numLives = 3;
    }
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