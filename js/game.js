const FiniteStateMachine = require('./finite-state-machine');
const Entity = require('./entity');
const InputSystem = require('./input-system');
const GraphicsSystem = require('./graphics-system');
const PhysicsSystem = require('./physics-system');
const Loop = require('./loop');
const SpriteSheet = require('./sprite-sheet');
const WorldMap = require('./world-map');
const WorldMapGenerator = require('./world-map-generator');
const Size = require('./size');
const Keyboard = require('./keyboard');

const States = {
  LOADING: 'loading',
  RUN: 'run',
  END: 'end'
};

class Game {
  constructor () {
    this.fsm = this._createFiniteStateMachine();
    this.spriteSheet = new SpriteSheet();
    this.worldMap = this._createWorldMap();
    this.player = this._createPlayer();
    this.entities = [this.player];
    this.keyboard = new Keyboard();
    this.inputSystem = this._createInputSystem();
    this.graphicsSystem = this._createGraphicSystem();
    this.physicsSystem = this._createPhysicsSystem();
    this.loop = new Loop({
      inputSystem: this.inputSystem,
      graphicsSystem: this.graphicsSystem,
      physicsSystem: this.physicsSystem
    });
  }

  load () {
    this.spriteSheet.generate();
    this.worldMap.generate();
  }

  run () {
    this.loop.start();
  }

  _createFiniteStateMachine () {
    return new FiniteStateMachine({
      state: States.RUN,
      transitions: [
        { from: States.LOAD, to: States.RUN },
        { from: States.RUN, to: States.END }
      ]
    });
  }

  _createPlayer () {
    return Entity.fromJson({
      position: { x: 240, y: 160 },
      velocity: {x: 0, y: 0},
      sprite: 'player'
    });
  }

  _createWorldMap () {
    const generator = new WorldMapGenerator({
      seed: 42042,
      width: 300,
      height: 200
    });

    generator.randomize()
      .smooth();
    const tileSize = new Size({
      width: 300,
      height: 200
    });
    return new WorldMap({
      tileSize: tileSize
    });
  }

  _createInputSystem () {
    return new InputSystem({
      player: this.player,
      keyboard: this.keyboard
    });
  }

  _createGraphicSystem () {
    return new GraphicsSystem({
      spriteSheet: this.spriteSheet,
      worldMap: this.worldMap,
      player: this.player
    });
  }

  _createPhysicsSystem () {
    return new PhysicsSystem({
      entities: this.entities,
      worldMap: this.worldMap
    });
  }
}

module.exports = Game;
