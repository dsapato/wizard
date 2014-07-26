//Globals
var m_canvas;
var m_context;

//Entry point
window.onload = function(){
    m_canvas = document.getElementById("myCanvas");

    m_context = m_canvas.getContext("2d");

    m_canvas.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    Game.init(m_context);
    Game._intervalId = setInterval(Game.run, 1000 / 60);
}

//Input handling
function handleClick(e){
    //console.log("We got a click on the window")
    var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - m_canvas.offsetLeft;
    var y = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop  - m_canvas.offsetTop;
    //console.log(x);
    //console.log(y);
}

function handleKeyDown(e){
    //console.log("Key down");
    //console.log(e.keyCode);
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