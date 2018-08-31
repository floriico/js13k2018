const Random = require('./random');
const Entity = require('./entity');
const Position = require('./position');
const SpriteSheet = require('./sprite-sheet');

class CristalGenerator {
  constructor (options) {
    this.seed = options.seed;
    this.random = new Random(this.seed);
  }

  build () {
    const position = new Position(0, 0);
    return new Entity({
      position: position,
      sprite: SpriteSheet.Ids.cristal1
    });
  }
}

module.exports = CristalGenerator;
