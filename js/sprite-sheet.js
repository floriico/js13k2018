const Sprite = require('./sprite');
const Random = require('./random');
const Position = require('./position');
const Colors = require('./colors');
const TextureGenerator = require('./texture-generator');

const Ids = {
  ground1: Sprite.fromJson({ position: { x: 0, y: 0 }, size: { width: 16, height: 16 } }),
  ground2: Sprite.fromJson({ position: { x: 16, y: 0 }, size: { width: 16, height: 16 } }),
  ground3: Sprite.fromJson({ position: { x: 32, y: 0 }, size: { width: 16, height: 16 } }),
  ground4: Sprite.fromJson({ position: { x: 48, y: 0 }, size: { width: 16, height: 16 } }),
  ground5: Sprite.fromJson({ position: { x: 64, y: 0 }, size: { width: 16, height: 16 } }),
  ground6: Sprite.fromJson({ position: { x: 80, y: 0 }, size: { width: 16, height: 16 } }),
  ground7: Sprite.fromJson({ position: { x: 96, y: 0 }, size: { width: 16, height: 16 } }),
  ground8: Sprite.fromJson({ position: { x: 112, y: 0 }, size: { width: 16, height: 16 } }),
  ground9: Sprite.fromJson({ position: { x: 128, y: 0 }, size: { width: 16, height: 16 } }),
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
    this._generateGround4();
    this._generateGround5();
    this._generateGround6();
    this._generateGround7();
    this._generateGround8();
    this._generateGround9();
    this._generatePlayer();
  }

  _generateGround1 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground1,
      seed: 52591
    });
    generator.fill(Colors.marsYellow)
      .particules(16, Colors.marsOrange);
  }

  _generateGround2 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground2,
      seed: 52593
    });
    generator.fill(Colors.marsYellow)
      .particules(32, Colors.marsOrange);
  }

  _generateGround3 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground3,
      seed: 52678
    });
    generator.fill(Colors.marsYellow)
      .particules(32, Colors.marsOrange)
      .particules(16, Colors.marsDarkOrange);
  }

  _generateGround4 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground4,
      seed: 52599
    });
    generator.fill(Colors.marsOrange)
      .particules(128, Colors.marsYellow)
      .particules(16, Colors.marsDarkOrange);
  }

  _generateGround5 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground5,
      seed: 52613
    });
    generator.fill(Colors.marsOrange)
      .particules(64, Colors.marsYellow)
      .particules(32, Colors.marsDarkOrange);
  }

  _generateGround6 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground6,
      seed: 52615
    });
    generator.fill(Colors.marsOrange)
      .particules(64, Colors.marsDarkOrange)
      .particules(32, Colors.marsYellow);
  }

  _generateGround7 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground7,
      seed: 52617
    });
    generator.fill(Colors.marsDarkOrange)
      .particules(128, Colors.marsOrange)
      .particules(32, Colors.marsYellow);
  }

  _generateGround8 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground8,
      seed: 52619
    });
    generator.fill(Colors.marsDarkOrange)
      .particules(64, Colors.marsOrange)
      .particules(32, Colors.marsYellow);
  }

  _generateGround9 () {
    const generator = new TextureGenerator({
      graphicalContext: this.graphicalContext,
      sprite: Ids.ground9,
      seed: 52621
    });
    generator.fill(Colors.marsDarkOrange)
      .particules(32, Colors.marsOrange)
      .particules(32, Colors.marsYellow);
  }

  _generateLava () {
    this._generateSand(Ids.lava, 79797, '#ff3300', '#ff0000', '#ffff00');
  }

  _generateSand (sprite, seed, color1, color2, color3) {
    const gc = this.graphicalContext;
    const position = sprite.getPosition();
    const size = sprite.getSize();
    const random = new Random(seed);
    gc.fillStyle = color1;
    gc.fillRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
    const dot = new Position();
    gc.fillStyle = color2;
    for (let i = 0; i < 32; i++) {
      dot.setPosition(
        position.getX() + Math.floor(random.next() * 15),
        position.getY() + Math.floor(random.next() * 15)
      );
      gc.fillRect(dot.getX(), dot.getY(), 1, 1);
    }
    gc.fillStyle = color3;
    for (let i = 0; i < 16; i++) {
      dot.setPosition(
        position.getX() + Math.floor(random.next() * 15),
        position.getY() + Math.floor(random.next() * 15)
      );
      gc.fillRect(dot.getX(), dot.getY(), 1, 1);
    }
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
