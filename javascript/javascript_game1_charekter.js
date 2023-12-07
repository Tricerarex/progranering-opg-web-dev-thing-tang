
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


top_pipe_img = new Image();
top_pipe_img.src = "imigas\watercolor-green-seaweed-png.webp"


// Game loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();