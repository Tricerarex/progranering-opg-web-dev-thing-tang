// Get the canvas element
var canvas = document.getElementById('Game-window');
var ctx = canvas.getContext('2d');

// Set the gravity
var gravity = 1;

// Define the sprite object
var sprite = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dy: 0,
    width: 50,
    height: 50,
    jumpForce: 20,
    image: new Image("/imigas/ab7d5fa02e5f513 copy.png")
};


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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
}

// Jump when spacebar is pressed
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        sprite.dy = -sprite.jumpForce;
    }
});

// Game loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();
