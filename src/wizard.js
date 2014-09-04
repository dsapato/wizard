//Globals
var m_canvas;
var m_context;

//Entry point
window.onload = function(){
    m_canvas = document.getElementById("myCanvas");

    m_context = m_canvas.getContext("2d");

    m_canvas.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    Game.init(m_context);
    Game._intervalId = setInterval(Game.run, 1000 / 60);
}

//Input handling
function handleClick(e){
    Game.mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - m_canvas.offsetLeft;
    Game.mouseY = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop  - m_canvas.offsetTop;
    Game.clicked = true;
}

function handleKeyDown(e){
    switch (event.keyCode) {
        case 37://Left
        case 65://A
            Game.moveLeft();
            break;
        case 38://Up
        case 87://W
            Game.moveUp();
            break;
        case 39://Right
        case 68://D
            Game.moveRight();
            break;
        case 40://Down
        case 83://S
            Game.moveDown();
            break;
    }
    e.preventDefault();
}

function handleKeyUp(e){
    switch (event.keyCode) {
        case 27://Escape
            Game.togglePause();
            break;
    }
    e.preventDefault();
}