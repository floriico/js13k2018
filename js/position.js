class Position {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  getX () {
    return this.x;
  }

  getY () {
    return this.y;
  }

  setPosition (x, y) {
    this.x = x;
    this.y = y;
  }

  static fromJson (options) {
    return new Position(options.x, options.y);
  }
}

module.exports = Position;
