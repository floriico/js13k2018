const WorldMap = require('./world-map');
const Position = require('./position');
const Size = require('./size');

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
    const playerPosition = this.player.getPosition();
    const cameraPosition = new Position(
      playerPosition.getX() - this.canvasCenter.getX(),
      playerPosition.getY() - this.canvasCenter.getY()
    );
    const cameraTilePosition = WorldMap.worldToTilePosition(cameraPosition);
    const pixelOffset = new Position(
      Math.round(playerPosition.getX() % 16),
      Math.round(playerPosition.getY() % 16),
    );
    const cameraTileSize = new Size({
      width: Math.floor(this.canvas.width / 16) + 1,
      height: Math.floor(this.canvas.height / 16) + 1
    });
    const cameraTileNumber = cameraTileSize.getWidth() * cameraTileSize.getHeight();
    const currentTilePosition = new Position();
    const displayPosition = new Position();

    for (let i = 0; i < cameraTileNumber; i++) {
      displayPosition.setPosition(
        Math.floor(i % cameraTileSize.getWidth()),
        Math.floor(i / cameraTileSize.getWidth())
      );
      currentTilePosition.setPosition(
        displayPosition.getX() + cameraTilePosition.getX(),
        displayPosition.getY() + cameraTilePosition.getY()
      );
      let tile = this.worldMap.getTile(currentTilePosition);
      let sprite = tile.getSprite();
      let position = sprite.getPosition();
      let size = sprite.getSize();
      this.graphicalContext.drawImage(this.spriteSheet.getCanvas(),
        position.getX(), position.getY(), size.getWidth(), size.getHeight(),
        displayPosition.getX() * 16 - pixelOffset.getX(), displayPosition.getY() * 16 - pixelOffset.getY(),
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
    const rightBound = worldSize.getWidth() - this.canvasCenter.getX();
    const bottomBound = worldSize.getHeight() - this.canvasCenter.getY();
    let x;
    let y;

    if (playerPosition.getX() < this.canvasCenter.getX()) {
      x = playerPosition.getX();
    } else if (playerPosition.getX() > rightBound) {
      x = playerPosition.getX() - rightBound + this.canvasCenter.getX();
    } else {
      x = this.canvasCenter.getX();
    }
    if (playerPosition.getY() < this.canvasCenter.getY()) {
      y = playerPosition.getY();
    } else if (playerPosition.getY() > bottomBound) {
      y = playerPosition.getY() - bottomBound + this.canvasCenter.getY();
    } else {
      y = this.canvasCenter.getY();
    }
    return new Position(
      Math.round(x),
      Math.round(y)
    );
  }

  _createCanvasCenter () {
    return Position.fromJson({
      x: Math.floor(this.canvas.width / 2),
      y: Math.floor(this.canvas.height / 2)
    });
  }
}

module.exports = GraphicsSystem;
