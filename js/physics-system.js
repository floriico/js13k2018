class PhysicsSystem {
  constructor (options) {
    this.entities = options.entities;
  }

  update (elapsedTime) {
    this.entities.forEach(function (entity) {
      let position = entity.getPosition();
      let velocity = entity.getVelocity();
      if (velocity) {
        let x = position.getX() + velocity.getX() * elapsedTime;
        let y = position.getY() + velocity.getY() * elapsedTime;
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
