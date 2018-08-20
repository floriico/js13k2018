const Sprite = require('./sprite');

const Ids = {
  ground1: Sprite.fromJson({ position: { x: 0, y: 0 }, size: { width: 16, height: 16 } }),
  ground2: Sprite.fromJson({ position: { x: 16, y: 0 }, size: { width: 16, height: 16 } }),
  ground3: Sprite.fromJson({ position: { x: 32, y: 0 }, size: { width: 16, height: 16 } }),
  player: Sprite.fromJson({ position: { x: 0, y: 16 }, size: { width: 16, height: 16 } })
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
    this._generateGround2();
    this._generateGround3();
    this._generatePlayer();
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

  _generateGround2 () {
    const gc = this.graphicalContext;
    const sprite = Ids.ground2;
    const position = sprite.getPosition();
    const size = sprite.getSize();
    gc.fillStyle = '#ff9966';
    gc.strokeStyle = '#ff6633';
    gc.fillRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
    gc.strokeRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
  }

  _generateGround3 () {
    const gc = this.graphicalContext;
    const sprite = Ids.ground3;
    const position = sprite.getPosition();
    const size = sprite.getSize();
    gc.fillStyle = '#ff0000';
    gc.strokeStyle = '#ff6600';
    gc.fillRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
    gc.strokeRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
  }

  _generatePlayer () {
    const gc = this.graphicalContext;
    const sprite = Ids.player;
    const position = sprite.getPosition();
    const size = sprite.getSize();
    gc.fillStyle = '#0066FF';
    gc.fillRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
  }
}

SpriteSheet.Ids = Ids;

module.exports = SpriteSheet;
