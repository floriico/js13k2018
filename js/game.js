const FiniteStateMachine = require('./finite-state-machine');
const Scene = require('./scene');
const Entity = require('./entity');
const GraphicsSystem = require('./graphics-system');
const PhysicsSystem = require('./physics-system');
const Loop = require('./loop');

const States = {
  LOADING: 'loading',
  RUN: 'run',
  END: 'end'
};

class Game {
  constructor () {
    this.fsm = this._createFiniteStateMachine();
    this.scenes = this._createScenes();
    this.graphicsSystem = new GraphicsSystem();
    this.physicsSystem = new PhysicsSystem();
    this.player = this._createPlayer();
    this.loop = new Loop({
      graphicsSystem: this.graphicsSystem,
      physicsSystem: this.physicsSystem
    });
    this._registerScene();
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
      position: { x: 0, y: 0 }
    });
  }

  _createScenes () {
    let scenes = {};

    scenes[States.LOAD] = new Scene();
    scenes[States.RUN] = new Scene();
    scenes[States.END] = new Scene();
    return scenes;
  }

  _registerScene () {
    this.graphicsSystem.clear();
    this.physicsSystem.clear();
    const scene = this.scenes[this.fsm.getState()];
    const entities = scene.getEntities();
    entities.forEach(this.graphicsSystem.register);
    entities.forEach(this.physicsSystem.register);
  }
}

module.exports = Game;
