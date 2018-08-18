const Position = require('./position');
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

  getSprite () {
    return this.sprite;
  }

  static fromJson (options) {
    let entityOptions = {};
    options.position && (entityOptions.position = Position.fromJson(options.position));
    options.sprite && (entityOptions.sprite = SpriteSheet.Ids[options.sprite]);
    return new Entity(entityOptions);
  }
}

module.exports = Entity;
