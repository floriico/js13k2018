class Keyboard {
  constructor () {
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      action: false
    };
    document.body.addEventListener('keydown', this.onKeyDown.bind(this));
    document.body.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown (event) {
    this.updateKey(event.keyCode, true);
  }

  onKeyUp (event) {
    this.updateKey(event.keyCode, false);
  }

  updateKey (keyCode, value) {
    if (keyCode === 38 || keyCode === 87 || keyCode === 90) {
      this.keys.up = value;
    } else if (keyCode === 40 || keyCode === 83) {
      this.keys.down = value;
    } else if (keyCode === 39 || keyCode === 68) {
      this.keys.right = value;
    } else if (keyCode === 37 || keyCode === 65 || keyCode === 81) {
      this.keys.left = value;
    } else if (keyCode === 69) {
      this.keys.action = value;
    }
  }
}

module.exports = Keyboard;
