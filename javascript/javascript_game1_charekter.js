




// Define the some variables
var obstacles = [];
var points = 0;               
var gameover1 = 2;

// Get the canvas element and info about it
var canvas = document.getElementById('Game-window');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');


// Set the gravity
var gravity = 0.25;

// Define the sprite object/ player / sprite
var sprite = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    dy: 0,
    width: 50,
    height: 50,
    jumpForce: 7,
    image: new Image("/imigas/ab7d5fa02e5f513 copy.png")
};


// Start of code that Draws Obstacles
function drawObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        context.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
    }
}
// End of code that Draws Obstacles


// Start of code that generate the obstacle's
setInterval(function() {
    
    //  Heighter number the more down it goes
    
    var maxHeight = 125; // Set this to your desired maximum height
    var minHeight = 500; // Set this to your desired minimum height
    var gapHeight = 175; // Set this to your desired gap height

    var obstacleTop = {
        x: canvas.width,
        y: 0,
        width: 100,
        height: minHeight + Math.random() * (minHeight - maxHeight) - gapHeight,
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
// End of code that generate the obstacle's


//Start of 
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
//End of


// makes sure the image is done loading before starting drawing pluss 
sprite.image.onload = function() {
    context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
};
// end of 


// States what images Sprite/Plaayer is
sprite.image.src = '/imigas/ab7d5fa02e5f513 copy.png';


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



// Start of Code that draw the player/Sprite
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
}
// End of Code that draw the Player/Sprite


// Start of Jump code
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        sprite.dy = -sprite.jumpForce;

    }
}); 
// End of Jump code


// Start of Game loop
function loop() {
    if(gameover1 == 0){
        update();
        updateObstacles();
        draw();
        drawObstacles();
        checkCollision();
        requestAnimationFrame(loop);
        
    }
    else if(gameover1==2) {
        drawStartScreen()
    }
}
// End of Game loop


// Start of Reset code
function reset(){
    obstacles = [];
    points = 0;               
    gameover1 = 0;
    sprite.y = canvas.height / 2;
    sprite.dy = 0;
    gameover1 = 0
    loop()
}
// End of Reset code


//start of reset/start button
canvas.addEventListener('click', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    if (gameover1 == 1 && x > canvas.width/2-100 && x < canvas.width/2+100 && y > canvas.height/1.5 && y < canvas.height/1.5+100) {
        drawStartScreen();
    }
    if (gameover1 == 2 && x > canvas.width/2-100 && x < canvas.width/2+100 && y > canvas.height/1.5 && y < canvas.height/1.5+100) {
        reset();
        
    }
    //info from click, and info about the button size
    //console.log(x,y)
    //console.log(canvas.width/2-100, canvas.height/1.5, canvas.width/2-100+200, canvas.height/1.5+100)
});
//end of restart button


// Start of gameover screen
function drawGameOverScreen(cause) {
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);  
    context.fillStyle = 'rgba(155, 155, 155, 0.75)';
    context.fillRect(canvas.width/2-100, canvas.height/1.5+25, 200, 50); 
    context.fillRect(canvas.width/2-100, canvas.height/8, 200, 60); 
    context.fillRect(canvas.width/2-300, canvas.height/8+75, 600, 60);
    context.font = "50px Arial";
    context.fillStyle = "red"; 
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Restart", canvas.width/2, canvas.height/1.5+50);
    context.fillText("Points:"+points/2, canvas.width/2, canvas.height/8+45);
    context.fillText("Reason of death:"+cause, canvas.width/2, canvas.height/8+105);
    gameover1 = 1;
}
// End of Game over screen


// Start of start screen
function drawStartScreen() {
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);  
    context.fillStyle = 'rgba(155, 155, 155, 0.75)';
    context.fillRect(canvas.width/2-100, canvas.height/1.5, 200, 100); 
    context.font = "50px Arial";
    context.fillStyle = "red"; 
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Start", canvas.width/2, canvas.height/1.5+50);
    gameover1 = 2;
}
// End of start screen


//Starts to run the whole code
loop();