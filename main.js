const cvs = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const ctx = cvs.getContext("2d");

// initialize all files
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load unit
let frames = 0;
let box = 32;

//create snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//create score var
let score = 0;

//SNAKE CONTROLLER
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    switch (event.keyCode) {
        case 37:
            if (d != "RIGHT") {
                d = "LEFT"
            }
            break;
        case 38:
            if (d != "DOWN") {
                d = "UP"
            }
            break;
        case 39:
            if (d != "LEFT") {
                d = "RIGHT"
            }
            break;
        case 40:
            if (d != "UP") {
                d = "DOWN"
            }
            break;
    }
}


//draw to canvas
function draw() {
    //DRAW GROUND
    ctx.drawImage(ground, 0, 0);
    //DRAW SNAKE
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "blue";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //DRAW FOOD
    ctx.drawImage(foodImg, food.x, food.y);

    //OLD HEAD POS
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //INCREMENT IF EAT
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }



    //DIRECTION
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //ADD NEW HEAD
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);


    //DRAW SCORE
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2.5 * box, 1.6 * box);

}

//call draw function every 100 ms
let game = setInterval(draw, 100);