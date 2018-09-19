// Enemies our player must avoid
class Enemy {
    constructor(initLoc=[0, 50], speed=100) {
      this.sprite = 'images/enemy-bug.png';// The image/sprite for our enemies
      this.x = initLoc[0];//initial horizontal position
      this.y = initLoc[1];//intial vertical position
      this.speed = speed;//speed
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x =
      this.x + this.speed * dt >= 505 ?
      (this.x + this.speed * dt) % 505 :
      this.x + this.speed * dt ;
    }

    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(initLoc=[202, 374]) {
      this.sprite = 'images/char-boy.png';// The image/sprite for the player
      this.x = initLoc[0];//initial horizontal position
      this.y = initLoc[1];//intial vertical position
    }

    // Update the player's position, required method for game
    // Parameter: dt, a time delta between ticks
    update() {} // empty because movement is managed by handleInput

    // Draw the player on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let en = new Enemy();
let allEnemies = [new Enemy(), new Enemy([101,126], 100)];
// Place the player object in a variable called player
let player = new Player();


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
