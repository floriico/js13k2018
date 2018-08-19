class InputSystem {
  constructor (options) {
    this.player = options.player;
    this.keyboard = options.keyboard;
  }

  update () {
    const velocity = this.player.getVelocity();

    if (this.keyboard.keys.up) {
      velocity.setY(-0.1);
    } else if (this.keyboard.keys.down) {
      velocity.setY(0.1);
    } else {
      velocity.setY(0);
    }
    if (this.keyboard.keys.right) {
      velocity.setX(0.1);
    } else if (this.keyboard.keys.left) {
      velocity.setX(-0.1);
    } else {
      velocity.setX(0);
    }
  }
}

module.exports = InputSystem;
