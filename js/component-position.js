class ComponentPosition {
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

  static fromJson (options) {
    return new ComponentPosition(options.x, options.y);
  }
}

module.exports = ComponentPosition;
