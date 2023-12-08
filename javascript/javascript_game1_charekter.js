
// Define the obstacles array
var obstacles = [];


// Get the canvas element
var canvas = document.getElementById('Game-window');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');


// Set the gravity
var gravity = 0.25;

// Define the sprie object
var sprite = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    dy: 0,
    width: 50,
    height: 50,
    jumpForce: 7,
    image: new Image("/imigas/ab7d5fa02e5f513 copy.png")
};


function drawObstacles() {
    context.fillStyle = 'red';
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        context.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
    }
}

setInterval(function() {
    var minHeight = 125; // Set this to your desired minimum height
    var maxHeight = 500; // Set this to your desired maximum height
    var gapHeight = 150; // Set this to your desired gap height

    var obstacleTop = {
        x: canvas.width,
        y: 0,
        width: 100,
        height: minHeight + Math.random() * (maxHeight - minHeight) - gapHeight,
        image: new Image()
    };
    obstacleTop.image.src = '/imigas/watercolor-green-seaweed-png.png';  
    obstacles.push(obstacleTop);

    var obstacleBottom = {
        x: canvas.width,
        y: obstacleTop.height + gapHeight,
        width: 100,
        height: canvas.height - obstacleTop.height - gapHeight,
        image: new Image()
    };
    obstacleBottom.image.src = '/imigas/watercolor-green-seaweed-png.webp';  
    obstacles.push(obstacleBottom);
}, 1000);




function updateObstacles() {
    console.log(obstacles);
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        obstacle.x -= 10; // Adjust speed here

        // Remove the obstacle if it's off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

sprite.image.onload = function() {
    context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
};
sprite.image.src = '/imigas/ab7d5fa02e5f513 copy.png';

// Update the sprite object
function update() {
    sprite.dy += gravity;
    sprite.y += sprite.dy;

    if (sprite.y + sprite.height > canvas.height) {
        sprite.y = canvas.height - sprite.height;
        sprite.dy = 0;
    }
}

//pipe's
let pipeArray = [];
let pipeWidth =20
let pipehigth = 50

let top_pipe_img ;
let bottom_pipe_img;



// Draw the sprite object
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
}

// Jump when spacebar is pressed
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        sprite.dy = -sprite.jumpForce;
    }
}); 



// Game loop
// Update the game loop
function loop() {
    update();
    updateObstacles();
    draw();
    drawObstacles();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();