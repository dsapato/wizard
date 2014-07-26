var Game = {};

var NUM_METEORS = 10;

Game.init = function(ctxt){
    this.context = ctxt;
    Player.init(ctxt);

    this.meteors = [];
    for (var i = 0; i < NUM_METEORS; i++) {
        this.meteors[i] = new Meteor();
        this.meteors[i].init(ctxt);
    }
}

Game.run = function(){
    Game.update();
    Game.draw();
}

Game.update = function(){
    Player.update();

    for (var i = 0; i < NUM_METEORS; i++) {
        this.meteors[i].update();
    }    
}

Game.draw = function(){
    this.context.fillStyle = "black"
    this.context.fillRect(0,0,640,480);

    for (var i = 0; i < NUM_METEORS; i++) {
        this.meteors[i].draw();
    }

    Player.draw();
}

Game.moveLeft = function(){
    Player.moveLeft();
}
Game.moveUp = function(){
    Player.moveUp();
}
Game.moveRight = function(){
    Player.moveRight();
}
Game.moveDown = function(){
    Player.moveDown();
}