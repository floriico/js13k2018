class Size {
  constructor (options) {
    this.width = options.width;
    this.height = options.height;
  }

  getWidth () {
    return this.width;
  }

  getHeight () {
    return this.height;
  }

  static fromJson (options) {
    return new Size({
      width: options.width,
      height: options.height
    });
  }
}

module.exports = Size;
