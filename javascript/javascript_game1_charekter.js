
//  Made it so 




// Define the variables
var obstacles = [];
var points = 0;               
var gameover1 = 0;

// Get the canvas element and info about it
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
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        obstacle.x -= 10; // Adjust speed here

        // Remove the obstacle if it's off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
            i--;
            points += 1;
            console.log(points)
        }
    }
}


// makes sure the image is done loading before starting drawing pluss 
sprite.image.onload = function() {
    context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
};
sprite.image.src = '/imigas/ab7d5fa02e5f513 copy.png';
// end of 

// Update the sprite movment up and down
function update() {
    sprite.dy += gravity;
    sprite.y += sprite.dy;

}
// end of updating sprite movment up and down

//start of collision check code
function checkCollision() {
    obstacles.forEach(obstacle => {
        // Check for collision with obstacle
        if (sprite.x < obstacle.x + obstacle.width &&
            sprite.x + sprite.width > obstacle.x &&
            sprite.y < obstacle.y + obstacle.height &&
            sprite.y + sprite.height > obstacle.y) {
                drawGameOverScreen("obstacles")
        }
    });
    // Collision detection with the ground
    if (sprite.y + sprite.height > canvas.height) {
        console.log("Collision detected with the ground!");
        drawGameOverScreen("ground")
    }

    // Collision detection with the sky
    if (sprite.y < 0) {
        console.log("Collision detected with the sky!");
        drawGameOverScreen("sky")
    }
}
// End of Collisision checking code



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
    if(gameover1 == 0){
        update();
        updateObstacles();
        draw();
        drawObstacles();
        checkCollision();
        requestAnimationFrame(loop);
    }
    console.log(gameover1);
}
//start of reset button
canvas.addEventListener('click', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    if (gameover1 != 0 && x > canvas.width/2-100 && x < canvas.width/2+100 && y > canvas.height/1.5 && y < canvas.height/1.5+100) {
        location.reload();
    }
    //info from click, and info about restart button size
    //console.log(x,y)
    //console.log(canvas.width/2-100, canvas.height/1.5, canvas.width/2-100+200, canvas.height/1.5+100)
});
//end of restart button


// Start of gameover screen
function drawGameOverScreen(cause) {
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);  
    context.fillStyle = 'rgba(155, 155, 155, 1)';
    context.fillRect(canvas.width/2-100, canvas.height/1.5, 200, 100); 
    context.font = "50px Arial";
    context.fillStyle = "red"; 
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Restart", canvas.width/2, canvas.height/1.5+50);
    gameover1 = 1;
}
// End of Game over screen



loop();