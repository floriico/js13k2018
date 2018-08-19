const PHYSICS_REFRESH_RATE = 30;

class Loop {
  constructor (options) {
    this.lastUpdate = null;
    this.physicsTimeAccumulator = 0;
    this.inputSystem = options.inputSystem;
    this.graphicsSystem = options.graphicsSystem;
    this.physicsSystem = options.physicsSystem;
  }

  start () {
    this.update(window.performance.now());
  }

  update (timestamp) {
    this.lastUpdate || (this.lastUpdate = timestamp);
    const deltaTime = timestamp - this.lastUpdate;
    this.physicsTimeAccumulator += deltaTime;
    this.inputSystem.update();
    if (this.physicsTimeAccumulator >= PHYSICS_REFRESH_RATE) {
      this.physicsTimeAccumulator -= PHYSICS_REFRESH_RATE;
      this.physicsSystem.update(PHYSICS_REFRESH_RATE);
    }
    this.graphicsSystem.update(deltaTime);
    this.lastUpdate = timestamp;
    window.requestAnimationFrame(this.update.bind(this));
  }
}

module.exports = Loop;
