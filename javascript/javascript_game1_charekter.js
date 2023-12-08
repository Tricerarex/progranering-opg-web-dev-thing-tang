
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
    var gapHeight = 175; // Set this to your desired gap height

    var obstacleTop = {
        x: canvas.width,
        y: 0,
        width: 100,
        height: minHeight + Math.random() * (maxHeight - minHeight) - gapHeight,
        image: new Image()
    };
    obstacleTop.image.src = '/imigas/piper.png';  
    obstacles.push(obstacleTop);

    var obstacleBottom = {
        x: canvas.width,
        y: obstacleTop.height + gapHeight,
        width: 100,
        height: canvas.height - obstacleTop.height - gapHeight,
        image: new Image()
    };
    obstacleBottom.image.src = '/imigas/pipe.png';  
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

    // if (sprite.y + sprite.height > canvas.height) {
    //     sprite.y = canvas.height - sprite.height;
    //     sprite.dy = 0;
    // }
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        // Check for collision with obstacle
        if (sprite.x < obstacle.x + obstacle.width &&
            sprite.x + sprite.width > obstacle.x &&
            sprite.y < obstacle.y + obstacle.height &&
            sprite.y + sprite.height > obstacle.y) {
                console.log("wowowowowowowowowo")
        }
    });
    // Collision detection with the ground
    if (sprite.y + sprite.height > canvas.height) {
        console.log("Collision detected with the ground!");
        // Handle the collision
    }

    // Collision detection with the sky
    if (sprite.y < 0) {
        console.log("Collision detected with the sky!");
        // Handle the collision
    }
}




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

var ctx = document.querySelector('canvas').getContext('2d');



// The rotation angle of the bird, in radians
var sprieAngle = 0;

// Function to draw the bird
function rotatesprite() {
    ctx.save(); // save the current state of the context

    // Translate to the bird's position
    ctx.translate(spriteX, spriteY);

    // Rotate the context by the bird's angle
    ctx.rotate(spriteAngle);

    // Draw the bird at its rotated position
    ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);

    ctx.restore(); // restore the context to its previous state
}

// Function to rotate the bird upwards
function rotateUp() {
    spriteAngle = -0.35; // about -20 degrees
}

// Function to rotate the bird downwards
function rotateDown() {
    spriteAngle = 1.57; // about 90 degrees
}

// Assuming 'window' is the object that receives the click event
window.addEventListener('click', function() {
    // Rotate the bird upwards when the window is clicked
    rotateUp();

    // After 200ms, rotate the bird downwards
    setTimeout(rotateDown, 200);
    console.log("click")
});

// Jump when spacebar is pressed
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
            // Rotate the bird upwards when the window is clicked
    rotateUp();

    // After 200ms, rotate the bird downwards
    setTimeout(rotateDown, 200);
        console.log("space")
    }
}); 
// Game loop
// Update the game loop
function loop() {
    update();
    updateObstacles();
    draw();
    drawObstacles();
    checkCollision()
    requestAnimationFrame(loop);
}

// Start the game loop
loop();