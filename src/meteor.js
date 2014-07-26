var Meteor = function(){

    const MOVE_SPEED = 3;

    this.init = function(ctxt){
        this.context = ctxt;

        this.width = 40;
        this.height = 40;
        this.image = new Image();
        this.image.src = "resources/meteor.jpg";
        this.xPos = 100 + (Math.random() * 500);
        this.yPos = Math.random() * 480;
    }

    this.update = function(){
        //Update location
        this.xPos -= MOVE_SPEED;

        //Check bounds
        if( this.xPos < 0){
            this.xPos = 640;
        }
    }

    this.draw = function(){
        this.context.drawImage(this.image, this.xPos, this.yPos);
    }
}