class PhysicsSystem {
  constructor () {
    this.entities = [];
  }

  update () {

  }

  clear () {
    this.entities = [];
  }

  register (entity) {
    this.entities.push(entity);
  }
}

module.exports = PhysicsSystem;
