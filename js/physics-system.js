class PhysicsSystem {
  constructor (options) {
    this.entities = options.entities;
    this.worldMap = options.worldMap;
  }

  update (elapsedTime) {
    const worldSize = this.worldMap.getSizeInPixel();
    const worldWidth = worldSize.getWidth();
    const worldHeight = worldSize.getHeight();
    this.entities.forEach(function (entity) {
      let position = entity.getPosition();
      let velocity = entity.getVelocity();
      if (velocity) {
        let x = position.getX() + velocity.getX() * elapsedTime;
        if (x < 0) {
          x += worldWidth;
        } else if (x >= worldWidth) {
          x -= worldWidth;
        }
        let y = position.getY() + velocity.getY() * elapsedTime;
        if (y < 0) {
          y += worldHeight;
        } else if (y >= worldHeight) {
          y -= worldHeight;
        }
        position.setPosition(x, y);
      }
    });
  }

  clear () {
    this.entities = [];
  }

  register (entity) {
    this.entities.push(entity);
  }
}

module.exports = PhysicsSystem;
