const WorldMap = require('./world-map');
const Position = require('./position');
const SpriteSheet = require('./sprite-sheet');

class GraphicsSystem {
  constructor (options) {
    this.spriteSheet = options.spriteSheet;
    this.worldMap = options.worldMap;
    this.player = options.player;
    this.camera = options.camera;
    this.canvas = document.getElementById('screen');
    this.canvasCenter = this._createCanvasCenter();
    this.graphicalContext = this.canvas.getContext('2d');
    this.entities = [];
  }

  update () {
    const gc = this.graphicalContext;

    gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawMap();
    this._drawPlayer();
  }

  register (entity) {
    this.entities.push(entity);
  }

  clear () {
    this.entities = [];
  }

  _drawMap () {
    const cameraPosition = this.player.getPosition();
    const cameraTilePosition = WorldMap.worldToTilePosition(cameraPosition);
    const tileWidth = Math.floor(this.canvas.width / 16);
    const tileHeight = Math.floor(this.canvas.height / 16);
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

  _drawPlayer () {
    const sprite = this.player.getSprite();
    const spritePosition = sprite.getPosition();
    const spriteSize = sprite.getSize();
    const displayPosition = this._getPlayerDisplayPosition();

    this.graphicalContext.drawImage(this.spriteSheet.getCanvas(),
      spritePosition.getX(), spritePosition.getY(), spriteSize.getWidth(), spriteSize.getHeight(),
      displayPosition.getX(), displayPosition.getY(), spriteSize.getWidth(), spriteSize.getHeight());
  }

  _getPlayerDisplayPosition () {
    const playerPosition = this.player.getPosition();
    const worldSize = this.worldMap.getPixelSize();
    let x;
    let y;

    if (playerPosition.getX() < this.canvasCenter.getX()) {
      x = playerPosition.getX();
    } else if (playerPosition.getX() > (worldSize.getWidth() - this.canvasCenter.getX())) {
      x = playerPosition.getX() - worldSize.getWidth();
    } else {
      x = this.canvasCenter.getX();
    }
    if (playerPosition.getY() < this.canvasCenter.getY()) {
      y = playerPosition.getY();
    } else if (playerPosition.getY() < (worldSize.getHeight() - this.canvasCenter.getY())) {
      y = playerPosition.getY() - worldSize.getHeight();
    } else {
      y = this.canvasCenter.getY();
    }
    return new Position(x, y);
  }

  _createCanvasCenter () {
    return Position.fromJson({
      x: Math.floor(this.canvas.width / 2),
      y: Math.floor(this.canvas.height / 2)
    });
  }
}

module.exports = GraphicsSystem;
