const Position = require('./position');
const Size = require('./size');

class Sprite {
  constructor (options) {
    this.position = options.position;
    this.size = options.size;
  }

  getPosition () {
    return this.position;
  }

  getSize () {
    return this.size;
  }

  static fromJson (options) {
    return new Sprite({
      position: Position.fromJson(options.position),
      size: Size.fromJson(options.size)
    });
  }
}

module.exports = Sprite;
