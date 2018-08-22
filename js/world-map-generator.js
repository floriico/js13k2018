const Random = require('./random');
const Size = require('./size');

class WorldMapGenerator {
  constructor (options) {
    this.random = new Random(options.seed);
    this.size = new Size({
      width: options.width,
      height: options.height
    });
    this.tileNumber = this.size.getWidth() * this.size.getHeight();
    this.heightMap = new Array(this.tileNumber);
  }

  randomize () {
    for (let i = 0; i < this.tileNumber; i++) {
      this.heightMap[i] = this.random.nextInRange(0, 9);
    }
    return this;
  }

  smooth () {
    this.heightMap = this.heightMap.map(function (cell, index, map) {
      const top = this._getTopIndex(index);
      const bottom = this._getBottomIndex(index);
      const right = this._getRightIndex(index);
      const left = this._getLeftIndex(index);

      return (cell + map[top] + map[bottom] + map[left] + map[right] / 5);
    }, this);
    return this;
  }

  _getTopIndex (index) {
    let top = index - this.size.getWidth();
    if (top < 0) {
      top += this.tileNumber;
    }
    return top;
  }

  _getBottomIndex (index) {
    let bottom = index + this.size.getWidth();
    if (bottom >= this.tileNumber) {
      bottom -= this.tileNumber;
    }
    return bottom;
  }

  _getRightIndex (index) {
    let right;
    if ((index % this.size.getWidth()) === 0) {
      right = index - this.size.getWidth();
    } else {
      right = index + 1;
    }
    return right;
  }

  _getLeftIndex (index) {
    let left;
    if ((index % this.size.getWidth) === 1) {
      left = index + this.size.getWidth();
    } else {
      left = index - 1;
    }
    return left;
  }
}

module.exports = WorldMapGenerator;
