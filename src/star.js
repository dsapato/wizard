var Star = function(){

    const BASE_MOVE_SPEED = 3;

    this.init = function(ctxt){
        this.context = ctxt;

        this.distance = 1 / ((Math.random() * 10) + 1);

        this.width = 16 * this.distance;
        this.height = 16 * this.distance;
        this.image = new Image();
        this.image.src = "resources/star.png";
        this.xPos = Math.random() * 640;
        this.yPos = Math.random() * 2000  + Player.yPos - 1000;
    }

    this.update = function(){
        //Update location
        this.xPos -= BASE_MOVE_SPEED * this.distance;

        //Check bounds
        if( this.xPos < 0 - this.width){
            this.xPos = 640;
            this.yPos = Math.random()  * 2000  + Player.yPos - 1000;
        }
    }

    this.draw = function(){
        this.context.drawImage(this.image, this.xPos, this.yPos - Player.yOffset, this.width, this.height);
    }
}