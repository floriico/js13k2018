class GraphicsSystem {
  constructor () {
    this.canvas = document.getElementById('screen');
    this.graphicalContext = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.entities = [];
  }

  update () {
    const gc = this.graphicalContext;

    gc.fillStyle = '#FABBEC';
    gc.fillRect(0, 0, this.width, this.height);
  }

  register (entity) {
    this.entities.push(entity);
  }

  clear () {
    this.entities = [];
  }
}

module.exports = GraphicsSystem;
