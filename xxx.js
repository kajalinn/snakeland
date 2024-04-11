let blockSize = 95;
let total_row = 10; //total row number
let total_col = 19; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0; //speed of snake in x coordinate.
let speedY = 0; //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let count = 0;
// Load snake image
let snakeImage = new Image();
snakeImage.src = '/home/kajl/project/examples/homeless/hhh.png';

let coinImage = new Image();
coinImage.src = '/home/kajl/project/examples/homeless/coin.png';

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection); //for movements
    document.addEventListener("keyup", restartGame);
    document.addEventListener("keyup", hideTitle); // for hiding the title
    showTitle(); // Show title initially
    updateScore();
    // Set snake speed
    setInterval(update, 1000 / 10);
}

function updateScore() {
    const scoreElement = document.getElementById("score"); // Получаем элемент счета
    scoreElement.textContent = "Score: " + count; // Обновляем содержимое элемента счета
}
function restartGame(e) {
    if (gameOver && e.code.startsWith("Arrow")) { // Check if spacebar is pressed to restart the game
        count = 0;
        updateScore()
        gameOver = false; // Reset game over flag
        snakeX = blockSize * 5; // Reset snake position
        snakeY = blockSize * 5;
        snakeBody = []; // Clear snake body
        placeFood(); // Place new food
        showTitle(); // Show title
    }
}

function hideTitle() {
    const title = document.querySelector(".title");
    if (!gameOver) { // Check if game is not over
        title.style.display = "none"; // Hide the title
    }
}

function showTitle() {
    const title = document.querySelector(".title");
    if (gameOver) { // Check if game is over
        title.style.display = "block"; // Show the title
    }
}

function update() {
    if (gameOver) {
        return;
    }

    // Clear the canvas
    context.clearRect(0, 0, board.width, board.height);

    // Background of a Game
    context.fillStyle = "transparent";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "transparent";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        count++;
        updateScore();
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Update snake position based on speed
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    // Draw snake
    drawSnake();
    drawFood();

    if (snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) { 
        // Out of bound condition
        gameOver = true;
        showTitle(); // Show title when game is over
    
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            // Snake eats own body
            gameOver = true;
            showTitle(); // Show title when game is over
        
        }
    }
}

function drawSnake() {
    // Draw each segment of the snake's body using the snake image
    for (let i = 0; i < snakeBody.length; i++) {
        context.drawImage(snakeImage, snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    // Draw the snake's head
    context.drawImage(snakeImage, snakeX, snakeY, blockSize, blockSize);
}
function drawFood(){
    context.drawImage(coinImage, foodX, foodY, blockSize, blockSize);
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (gameOver || !e.code.startsWith("Arrow")) { // Check if game is over or if arrow key is pressed
        return; // Do nothing if game is over or other keys are pressed
    }
    
    if (e.code == "ArrowUp" && speedY != 1) { 
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}


// Randomly place food
function placeFood() {
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}
