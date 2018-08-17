const WorldTile = require('./world-tile');
const SpriteSheet = require('./sprite-sheet');
const Position = require('./position');

class WorldMap {
  constructor (options) {
    this.width = options.width;
    this.height = options.height;
    this.size = this.height * this.width;
    this.tiles = new Array(this.size);
  }

  generate () {
    for (let i = 0; i < this.size; i++) {
      this.tiles[i] = new WorldTile({
        sprite: SpriteSheet.Ids.ground1
      });
    }
  }

  getTile (position) {
    const id = position.y * this.width + position.x;
    return this.tiles[id];
  }

  static worldToTilePosition (worldPosition) {
    return Position.fromJson({
      x: Math.floor(worldPosition.x / 16),
      y: Math.floor(worldPosition.y / 16)
    });
  }
}

module.exports = WorldMap;
