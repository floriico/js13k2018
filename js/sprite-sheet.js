const Sprite = require('./sprite');

const Ids = {
  ground1: Sprite.fromJson({ position: { x: 0, y: 0 }, size: { width: 16, height: 16 } })
};

class SpriteSheet {
  constructor () {
    this.canvas = document.getElementById('spriteSheet');
    this.graphicalContext = this.canvas.getContext('2d');
  }

  getCanvas () {
    return this.canvas;
  }

  generate () {
    this._generateGround1();
  }

  _generateGround1 () {
    const gc = this.graphicalContext;
    const sprite = Ids.ground1;
    const position = sprite.getPosition();
    const size = sprite.getSize();
    gc.fillStyle = '#ff9900';
    gc.strokeStyle = '#ff6600';
    gc.fillRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
    gc.strokeRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
  }
}

SpriteSheet.Ids = Ids;

module.exports = SpriteSheet;
