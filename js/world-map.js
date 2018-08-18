const WorldTile = require('./world-tile');
const SpriteSheet = require('./sprite-sheet');
const Position = require('./position');
const Size = require('./size');

class WorldMap {
  constructor (options) {
    this.tileSize = options.tileSize;
    this.pixelSize = this._createPixelSize();
    this.tileNumber = this.tileSize.getWidth() * this.tileSize.getHeight();
    this.tiles = new Array(this.size);
  }

  generate () {
    for (let i = 0; i < this.tileNumber; i++) {
      this.tiles[i] = new WorldTile({
        sprite: SpriteSheet.Ids.ground1
      });
    }
  }

  getTile (position) {
    const id = position.getY() * this.tileSize.getWidth() + position.getX();
    return this.tiles[id];
  }

  getPixelSize () {
    return this.pixelSize();
  }

  static worldToTilePosition (worldPosition) {
    return Position.fromJson({
      x: Math.floor(worldPosition.x / 16),
      y: Math.floor(worldPosition.y / 16)
    });
  }

  _createPixelSize () {
    return new Size({
      width: this.tileSize.getWidth() * WorldTile.getSize().getWidth(),
      height: this.tileSize.getHeight() * WorldTile.getSize().getHeight()
    });
  }
}

module.exports = WorldMap;
