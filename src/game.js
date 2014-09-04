var Game = {};

Game.init = function(ctxt){
    this.context = ctxt;
    this.context.font = "16pt Trebuchet MS";
    this.context.textAlign = "center";
    this.mouseX = 0;
    this.mouseY = 0;
    this.clicked = false;

    Player.init(this.context);

    this.NUM_METEORS = 50;
    this.NUM_STARS = 100;
    this.NUM_ITEMS = 2;

    this.meteors = [];
    for (var i = 0; i < this.NUM_METEORS; i++) {
        this.meteors[i] = new Meteor();
        this.meteors[i].init(this.context);
    }
    this.stars = [];
    for (var i = 0; i < this.NUM_STARS; i++) {
        this.stars[i] = new Star();
        this.stars[i].init(this.context);
    }
    this.items = [];
    for (var i = 0; i < this.NUM_ITEMS; i++) {
        this.items[i] = new Item();
        this.items[i].init(this.context);
    }

    this.states = {
        MAIN_MENU : 0,
        IN_GAME : 1,
        PAUSED : 2,
        DEAD : 3,
        INSTRUCTIONS : 4
    }
    this.state = this.states.MAIN_MENU;

    this.frames = 0;
    this.score = 0;
    this.bestScore = 0;

    //Main Menu
    this.menuButtonTitle1 = new Button();
    this.menuButtonTitle1.init(this.context, 120, 120, 400, 32, true, "That Wizard Came From The Moon");
    this.menuButtonTitle2 = new Button();
    this.menuButtonTitle2.init(this.context, 255, 170, 128, 32, true, "By Dan Sapato");
    this.menuButtonPlay = new Button();
    this.menuButtonPlay.init(this.context,255, 220, 128, 32, false, "Start Game");

    //Instruction menu
    this.instructionButtonTitle1 = new Button();
    this.instructionButtonTitle1.init(this.context, 190, 120, 256, 32, true, "Arrow keys or WASD to move");
    this.instructionButtonTitle2 = new Button();
    this.instructionButtonTitle2.init(this.context, 120, 170, 400, 32, true, "Dodge the meteors, grab the health packs")    
    this.instructionButtonPlay = new Button();
    this.instructionButtonPlay.init(this.context,255, 220, 128, 32, false, " Begin");

    //Pause Menu
    this.pauseButtonTitle = new Button();
    this.pauseButtonTitle.init(this.context, 255, 170, 128, 32, true, "Paused");
    this.pauseButtonResume = new Button();
    this.pauseButtonResume.init(this.context, 255, 220, 128, 32, false, "Resume");

    //Dead Menu
    this.deadButtonTitle = new Button();
    this.deadButtonTitle.init(this.context, 255, 170, 128, 32, true, "You died.");
    this.deadButtonResume = new Button();
    this.deadButtonResume.init(this.context, 255, 220, 128, 32, false, "Restart");
}

Game.run = function(){
    Game.update();
    Game.draw();
}

Game.update = function(){
    switch(this.state){
        case this.states.IN_GAME://game loop
            Player.update();

            for (var i = 0; i < this.NUM_METEORS; i++) {
                this.meteors[i].update();
            }
            for (var i = 0; i < this.NUM_STARS; i++) {
                this.stars[i].update();
            }
            for (var i = 0; i < this.NUM_ITEMS; i++) {
                this.items[i].update();
            }
            this.frames++;
            if(this.frames % 60 == 0){//Score is number of seconds
                this.score++;
                if(this.score % 3 == 0){//Add meteor every three seconds
                    this.NUM_METEORS++;
                    this.meteors[this.meteors.length] = new Meteor();
                    this.meteors[this.meteors.length - 1].init(this.context);
                }
                if(this.score > this.bestScore){
                    this.bestScore = this.score;
                }
            }
            break;

        case this.states.PAUSED:
            if(this.clicked && this.pauseButtonResume.isClicked(this.mouseX, this.mouseY)){
                this.state = this.states.IN_GAME;
            }
            break

        case this.states.MAIN_MENU:
            if(this.clicked && this.menuButtonPlay.isClicked(this.mouseX, this.mouseY)){
                this.state = this.states.INSTRUCTIONS;
            }
            break;

        case this.states.INSTRUCTIONS:
            if(this.clicked && this.instructionButtonPlay.isClicked(this.mouseX, this.mouseY)){
                this.state = this.states.IN_GAME;
            }
            break;            

        case this.states.DEAD:
            if(this.clicked && this.deadButtonResume.isClicked(this.mouseX, this.mouseY)){
                this.resetGame();
                this.state = this.states.IN_GAME;
            }
            break;
    }

    this.clicked = false    
}

Game.draw = function(){
    if(Player.hurt){
        this.context.fillStyle = "red";
    }
    else{
        this.context.fillStyle = "black";
    }
    this.context.fillRect(0,0,640,480);
    
    for (var i = 0; i < this.NUM_STARS; i++) {
        this.stars[i].draw();
    }    

    for (var i = 0; i < this.NUM_METEORS; i++) {
        this.meteors[i].draw();
    } 

    for (var i = 0; i < this.NUM_ITEMS; i++) {
        this.items[i].draw();
    }    

    Player.draw();

    switch(this.state){
        case this.states.PAUSED:
            this.pauseButtonTitle.draw();
            this.pauseButtonResume.draw();
            break

        case this.states.MAIN_MENU:
            this.menuButtonTitle1.draw();
            this.menuButtonTitle2.draw();            
            this.menuButtonPlay.draw();
            break;

        case this.states.INSTRUCTIONS:
            this.instructionButtonTitle1.draw();
            this.instructionButtonTitle2.draw();
            this.instructionButtonPlay.draw();
            break;            

        case this.states.DEAD:
            this.deadButtonTitle.draw();
            this.deadButtonResume.draw();
            break;
    }

    var scoreStr = "Time: " + this.score + " seconds";
    var bestStr = "Best: " + this.bestScore;
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText(scoreStr, 100, 40);
    this.context.fillText(bestStr, 550, 40);
    this.context.textAlign = "center";
}

Game.resetGame = function(){
    this.frames = 0;
    this.score = 0;
    this.NUM_METEORS = 50;
    Player.numLives = 3;
    Player.xPos = 20;
    Player.yPos = 0;
    for (var i = 0; i < this.NUM_METEORS; i++) {
        this.meteors[i].xPos = 1200 + (Math.random() * 500);
    };
}

Game.togglePause = function(){
    if(this.state == this.states.PAUSED){
        this.state = this.states.IN_GAME;
        return;
    }
    this.state = this.states.PAUSED;
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