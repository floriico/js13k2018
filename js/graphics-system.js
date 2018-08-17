const WorldMap = require('./world-map');
const Position = require('./position');
const SpriteSheet = require('./sprite-sheet');

class GraphicsSystem {
  constructor (options) {
    this.spriteSheet = options.spriteSheet;
    this.worldMap = options.worldMap;
    this.camera = options.camera;
    this.canvas = document.getElementById('screen');
    this.graphicalContext = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.entities = [];
  }

  update () {
    const gc = this.graphicalContext;

    gc.clearRect(0, 0, this.width, this.height);
    this._drawMap();
  }

  register (entity) {
    this.entities.push(entity);
  }

  clear () {
    this.entities = [];
  }

  _drawMap () {
    const cameraPosition = this.camera.getPosition();
    const cameraTilePosition = WorldMap.worldToTilePosition(cameraPosition);
    const tileWidth = Math.floor(this.width / 16);
    const tileHeight = Math.floor(this.height / 16);
    const tileLength = tileWidth * tileHeight;
    const currentTilePosition = new Position();

    for (let i = 0; i < tileLength; i++) {
      currentTilePosition.setPosition(
        Math.floor(i % tileWidth),
        Math.floor(i / tileWidth)
      );
      let tile = this.worldMap.getTile(currentTilePosition);
      let sprite = tile.getSprite();
      let position = sprite.getPosition();
      let size = sprite.getSize();
      this.graphicalContext.drawImage(this.spriteSheet.getCanvas(),
        position.getX(), position.getY(), size.getWidth(), size.getHeight(),
        currentTilePosition.getX() * 16, currentTilePosition.getY() * 16,
        size.getWidth(), size.getHeight());
    }
  }
}

module.exports = GraphicsSystem;
