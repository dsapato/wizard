var Button = function(){

    this.init = function(ctxt, x, y, width, height, clear, text){
        this.context = ctxt;

        this.xPos = x;
        this.yPos = y;
        this.width = width;
        this.height = height;
        this.clear = clear;
        this.text = text;
        this.image = new Image();
        this.image.src = "resources/button.png";
    }

    this.isClicked = function(mouseX, mouseY){
        if(this.yPos < mouseY){
            if(this.yPos + this.height > mouseY){
                if(this.xPos < mouseX){
                    if(this.xPos + this.width > mouseX){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    this.draw = function(){
        if(!this.clear)
            this.context.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
        this.context.fillStyle = "white";
        this.context.fillText(this.text, this.xPos+this.width/2, this.yPos+this.height*.75, this.width);

    }
}