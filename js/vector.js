const Position = require('./position');

class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  getX () {
    return this.x;
  }

  setX (x) {
    this.x = x;
  }

  getY () {
    return this.y;
  }

  setY (y) {
    this.y = y;
  }

  movePoint (position) {
    return new Position(position.getX() + this.x, position.getY() + this.y);
  }

  static fromJson (options) {
    return new Vector(options.x, options.y);
  }
}

module.exports = Vector;
