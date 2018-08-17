'use strict';

class Camera {
  constructor (options) {
    this.position = options.position;
  }

  getPosition () {
    return this.position;
  }

  setPosition (position) {
    this.position = position;
  }
}

module.exports = Camera;
