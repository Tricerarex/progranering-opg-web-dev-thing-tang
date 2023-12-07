
// Define the obstacles array
var obstacles = [];


// Get the canvas element
var canvas = document.getElementById('Game-window');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');


// Set the gravity
var gravity = 1;

// Define the sprite object
var sprite = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    dy: 0,
    width: 50,
    height: 50,
    jumpForce: 20,
    image: new Image("/imigas/ab7d5fa02e5f513 copy.png")
};

setInterval(function() {
    var obstacle = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 100),
        width: 50,
        height: 50
    };
    obstacles.push(obstacle);
}, 1000);

function updateObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        obstacle.x -= 5; // Adjust speed here

        // Remove the obstacle if it's off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

sprite.image.onload = function() {
    // Image has been loaded, now you can draw it
    context.fillstyle = "green"
    context.fillrect(sprite.x, sprite.y, sprite.width, sprite.height)
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

function drawObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}



// Game loop
function loop() {
    update();
    updateObstacles();
    drawObstacles();
    draw();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();