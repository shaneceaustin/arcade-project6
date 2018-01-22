 // Enemies our player must avoid
 var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    // if enemy goes off the screen it will then return to the left side
    if (this.x > 550) {
        this.x = -100;
    }
    // when the player and enemy collide the player goes back the starting position
    if (this.x + 75 > player.x && this.y === player.y && this.x - 75 < player.x && this.y === player.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
    // function that returns player to the starter position
    this.reset = function() {
        this.x = 200;
        this.y = 400;
    };
    // when the player wins the enemy stops moving 
    this.win = function() {
        enemy1.speed = 0;
        enemy2.speed = 0;
        enemy3.speed = 0;
        player.y = -10;
    };
};

Player.prototype.update = function(dt) {
    // Player boundaries x axis
    if (this.x < 0) {
        this.x = 0; 
    }
    if (this.x > 400) {
        this.x = 400;
    }
    // Player bounderies y axis
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y <= 0) {
        this.win();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == "left") {
        this.x -= 100;
    }
    if (key == "right") {
        this.x += 100;
    }
    if (key == "down") {
        this.y += 50;
    }
    if (key == "up") {
        this.y -= 50;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0, 50, 'images/enemy-bug.png');
var enemy2 = new Enemy(200, 150, 'images/enemy-bug.png');
var enemy3 = new Enemy(500, 250, 'images/enemy-bug.png');

var allEnemies = [
    enemy1,
    enemy2,
    enemy3
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
