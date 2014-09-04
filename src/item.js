var Item = function(){

    const MOVE_SPEED = 3;

    this.init = function(ctxt){
        this.context = ctxt;

        this.width = 20;
        this.height = 20;
        this.image = new Image();
        this.image.src = "resources/itemLife.png";
        this.xPos = 1200 + (Math.random() * 500);
        this.yPos = Math.random() * 1640  + Player.yPos - 500;
        this.vy = Math.random() * 2 - 1;
    }

    this.update = function(){
        //Update location
        this.xPos -= MOVE_SPEED;
        this.yPos += this.vy;

        var playerX = Player.xPos;
        var playerY = Player.yPos;
        var playerHeight = Player.height;
        var playerWidth = Player.width;

        //Check bounds
        if( this.xPos < 0 - this.width){
            this.xPos = 640;
            this.yPos = Math.random() * 1640  + playerY - 500;
        }

        if(this.yPos < playerY + playerHeight){
            if(this.yPos + this.height > playerY){
                if(this.xPos < playerX + playerWidth){
                    if(this.xPos + this.width > playerX){
                        Player.addLife();
                        //Effectly explode
                        this.xPos = 640;
                        this.yPos = Math.random() * 1640  + playerY - 500;
                    }
                }
            }
        }

    }

    this.draw = function(){
        this.context.drawImage(this.image, this.xPos, this.yPos - Player.yOffset);
    }
}