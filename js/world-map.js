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
    const tilePosition = new Position();
    for (let i = 0; i < this.tileNumber; i++) {
      tilePosition.setPosition(
        Math.floor(i % this.tileSize.getWidth()),
        Math.floor(i / this.tileSize.getWidth())
      );
      if ((tilePosition.getX() < 15) || (tilePosition.getX() > this.tileSize.getWidth() - 15) ||
          (tilePosition.getY() < 10) || (tilePosition.getY() > this.tileSize.getHeight() - 10)) {
        this.tiles[i] = new WorldTile({
          sprite: SpriteSheet.Ids.ground3
        });
      } else {
        let tileId = 'ground' + Math.floor(Math.random() * 2 + 1);
        this.tiles[i] = new WorldTile({
          sprite: SpriteSheet.Ids[tileId]
        });
      }
    }
  }

  getTile (position) {
    const id = position.getY() * this.tileSize.getWidth() + position.getX();
    return this.tiles[id];
  }

  getPixelSize () {
    return this.pixelSize;
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
