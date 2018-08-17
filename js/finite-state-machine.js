class FiniteStateMachine {
  constructor (options) {
    this.state = options.state;
    this.transitions = options.transitions;
  }

  getState () {
    return this.state;
  }

  changeState (state) {
    const isTransitionValid = this.transitions.some(function (transition) {
      return transition.from === this.state &&
          transition.to === state;
    });
    if (isTransitionValid) {
      this.state = state;
    }
  }
}

module.exports = FiniteStateMachine;
