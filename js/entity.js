const Position = require('./position');

class Entity {
  constructor (options) {
    this.position = options.position;
    this.velocity = options.velocity;
  }

  getPosition () {
    return this.position;
  }

  static fromJson (options) {
    let entityOptions = {};
    options.position && (entityOptions.position = Position.fromJson(options.position));
    return new Entity(entityOptions);
  }
}

module.exports = Entity;
