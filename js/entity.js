const Position = require('./position');
const Vector = require('./vector');
const SpriteSheet = require('./sprite-sheet');

class Entity {
  constructor (options) {
    this.position = options.position;
    this.velocity = options.velocity;
    this.sprite = options.sprite;
  }

  getPosition () {
    return this.position;
  }

  getVelocity () {
    return this.velocity;
  }

  getSprite () {
    return this.sprite;
  }

  static fromJson (options) {
    let entityOptions = {};
    options.position && (entityOptions.position = Position.fromJson(options.position));
    options.velocity && (entityOptions.velocity = Vector.fromJson(options.velocity));
    options.sprite && (entityOptions.sprite = SpriteSheet.Ids[options.sprite]);
    return new Entity(entityOptions);
  }
}

module.exports = Entity;
