// Enemies the player must avoid
'use strict';
class Enemy {
    constructor(initLoc, speed) {
      this.sprite = 'images/enemy-bug.png';// The image/sprite for our enemies
      this.x = initLoc[0];//initial horizontal position
      this.y = initLoc[1];//intial vertical position
      this.speed = speed;//speed
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
      // Any movement is multipled by dt to ensure the game runs at the same
      //speed for all computers.
      //Enemies are moving from left to right.
      //Enemies come back at the top left after having reached the top right
      this.x =
      this.x + this.speed * dt >= 505 ?
      (this.x + this.speed * dt) % 505 :
      this.x + this.speed * dt ;
    }

    // Draw the enemy on the screen
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(initLoc=[202, 374]) {
      this.sprite = 'images/char-boy.png';// The image/sprite for the player
      this.x = initLoc[0];//initial horizontal position
      this.y = initLoc[1];//initial vertical position
    }

    // Update the player's position
    // Parameter: dt, a time delta between ticks
    update() {} // empty because movement is managed by handleInput

    // Draw the player on the screen
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handle key inputs
    handleInput(key) {
      switch (key) {
        case 'left':
          //move to left and no offscreen
          this.x = this.x === 0 ? 404 : this.x - 101;
          break;
          //move to right and no offscreen
        case 'right':
          this.x = this.x === 404 ? 0 : this.x + 101;
          break;
          //move up and winning condition
        case 'up':
          if (this.y === 42) {
            this.y -= 83;
            alert('Congratulations, you won!');
            this.x = 202;
            this.y = 374;
          } else {
            this.y -= 83;
          }
          break;
          //move down and no offscreen
        case 'down':
          this.y = this.y === 374 ? this.y : this.y + 83;
          break;
        default:
          break;
      }
    }
}


//Instantiate objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
//Instatiate 3 enemies with a random speed and add them to the array
for (let i = 1; i < 4; i++ ) {
  let enemy = new Enemy([101, i * 83 - 31], 50 + Math.random() * 200);
  allEnemies.push(enemy);
}

// Player object
let player = new Player();


// Listens for key presses. Sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
