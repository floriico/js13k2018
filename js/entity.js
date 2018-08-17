const ComponentPosition = require('./component-position');

class Entity {
  constructor (options) {
    this.position = options.position;
    this.velocity = options.velocity;
  }

  static fromJson (options) {
    let entityOptions = {};
    options.position && (entityOptions.position = ComponentPosition.fromJson(options.position));
    return new Entity(entityOptions);
  }
}

module.exports = Entity;
