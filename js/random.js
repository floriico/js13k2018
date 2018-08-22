const N = 2147483647;
const G = 48271;

class Random {
  constructor (seed) {
    this.seed = seed;
  }

  next () {
    this.seed = (G * this.seed) % N;
    return this.seed / N;
  }

  nextInRange (min, max) {
    return min + Math.floor(this.next() * (max - min));
  }
}

module.exports = Random;
