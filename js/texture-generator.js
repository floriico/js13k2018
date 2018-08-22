const Random = require('./random');
const Position = require('./position');

class TextureGenerator {
  constructor (options) {
    this.graphicalContext = options.graphicalContext;
    this.sprite = options.sprite;
    this.random = new Random(options.seed);
  }

  fill (color) {
    const gc = this.graphicalContext;
    const position = this.sprite.getPosition();
    const size = this.sprite.getSize();

    gc.fillStyle = color;
    gc.fillRect(position.getX(), position.getY(), size.getWidth(), size.getHeight());
    return this;
  }

  particules (number, color) {
    const gc = this.graphicalContext;
    const position = this.sprite.getPosition();
    const size = this.sprite.getSize();

    gc.fillStyle = color;
    const dot = new Position();
    for (let i = 0; i < number; i++) {
      dot.setPosition(
        position.getX() + Math.floor(this.random.next() * (size.getWidth() - 1)),
        position.getY() + Math.floor(this.random.next() * (size.getHeight() - 1))
      );
      gc.fillRect(dot.getX(), dot.getY(), 1, 1);
    }
    return this;
  }
}

module.exports = TextureGenerator;
