const Size = require('./size');

const SIZE = new Size({
  width: 16,
  height: 16
});

class WorldTile {
  constructor (options) {
    this.sprite = options.sprite;
  }

  getSprite () {
    return this.sprite;
  }

  static getSize () {
    return SIZE;
  }
}

module.exports = WorldTile;
