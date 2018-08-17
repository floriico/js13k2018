class Scene {
  constructor () {
    this.entities = [];
  }

  addEntity (entity) {
    this.entities.push(entity);
  }

  getEntities () {
    return this.entities;
  }
}

module.exports = Scene;
