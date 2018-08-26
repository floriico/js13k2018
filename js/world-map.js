const WorldTile = require('./world-tile');
const Position = require('./position');
const Size = require('./size');

class WorldMap {
  constructor (options) {
    this.sizeInTile = options.sizeInTile;
    this.sizeInPixel = this._createsizeInPixel();
    this.tileNumber = this.sizeInTile.getWidth() * this.sizeInTile.getHeight();
    this.tiles = options.tiles;
  }

  getTile (position) {
    const width = this.sizeInTile.getWidth();
    const height = this.sizeInTile.getHeight();
    let x = position.getX();
    if (x < 0) {
      x += width;
    } else if (x >= width) {
      x -= width;
    }
    let y = position.getY();
    if (y < 0) {
      y += height;
    } else if (y >= height) {
      y -= height;
    }
    const id = y * this.sizeInTile.getWidth() + x;
    return this.tiles[id];
  }

  getSizeInPixel () {
    return this.sizeInPixel;
  }

  static worldToTilePosition (worldPosition) {
    const tileSize = WorldTile.getSize();

    return Position.fromJson({
      x: Math.floor(worldPosition.x / tileSize.getWidth()),
      y: Math.floor(worldPosition.y / tileSize.getHeight())
    });
  }

  _createsizeInPixel () {
    return new Size({
      width: this.sizeInTile.getWidth() * WorldTile.getSize().getWidth(),
      height: this.sizeInTile.getHeight() * WorldTile.getSize().getHeight()
    });
  }
}

module.exports = WorldMap;
