class WorldTile {
  constructor (options) {
    this.sprite = options.sprite;
  }

  getSprite () {
    return this.sprite;
  }
}

module.exports = WorldTile;
