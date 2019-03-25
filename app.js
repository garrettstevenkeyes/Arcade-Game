// Place all enemy objects in an array called allEnemies
allEnemies = [];

//make the character that you play as random
character = ['images/char-horn-girl.png', 'images/char-boy.png', 'images/char-cat-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
var character = character[Math.floor(Math.random() * 5)];

//Random insect speeds
//https://stackoverflow.com/questions/19132637/selected-a-random-number-from-a-set
var speed1 = randomNumber([100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400]);
var speed2 = randomNumber([100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400]);
var speed3 = randomNumber([100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400]);
var speed4 = randomNumber([100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400]);

//choose random nuber from set of numbers
function randomNumber(set){
    var rndm = Math.floor(Math.random() * 16);
    return set[rndm];
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //set enemy x, y, and speed variables 
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/* Update the enemy's position, required method for game
Parameter: dt, a time delta between ticks */

Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
    which will ensure the game runs at the same speed for
    all computers. */

    //If the enemy is not passed boundary
    if (this.x > -130) {
        //increment x by speed * dt
        this.x = this.x + this.speed * dt;
        //else
        if (this.x > 505) {
            //Reset position to start
            this.x = -120;
        }
    }  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*This class requires an update(), render() and
a handleInput() method.
*/

//Hero class
class Hero {
    constructor(x, y) {
        //set the x and y variables to 
        this.x = x;
        this.y = y;
        this.sprite = character;        
    };

    //Render sprite on current x and y coordinate position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);        
    };

    handleInput(input) {
    //if you hit left and the character is on screen move to the left 
      if (input == 'left' && this.x > 0) {
            this.x = this.x - 20;
        //if you hit right and the character is not moving off screen then move right
        } if (input == 'right' && this.x < 412) {
            this.x = this.x + 20;
        //if you hit up and the player is not going to move into the water then move up
        } if (input == 'up' && this.y > 0) {
            this.y = this.y - 20; 
        //if you hit down and the character is not going to move off the screen then move down           
        } if (input == 'down' && this.y < 425) {
            this.y = this.y + 20;
        }
        //if you reach the water reset to the beginning and send the alert that you made it 
        if (this.y < 0) {
            this.y = 395, this.x = 202;
            alert('You made it!');
        }    
    };

    update() {
        allEnemies.forEach(Enemy => {
            //this creates a box around the bugs for the collision system
            if (((Enemy.x > (this.x-51)) && (Enemy.x < (this.x+51))) && ((Enemy.y > (this.y-30)) && (Enemy.y < (this.y+30)))) {
                this.x=192, this.y=405;
            } 
        });
    };
};

// Place the player object in a variable called player
const player = new Hero(192, 405);

//-------------



//first bug
const insect1 = new Enemy(-120, 45, speed1);
//add to the allEnemies array
allEnemies.push(insect1);

// second bug
const insect2 = new Enemy(-120, 125, speed2);
//add to the allEnemies array
allEnemies.push(insect2);

// third bug
const insect3 = new Enemy(-120, 205, speed3);
//add to the allEnemies array
allEnemies.push(insect3);

//fourth bug
const insect4 = new Enemy(-120, 305, speed4);
//add to the allEnemies array
allEnemies.push(insect4);

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