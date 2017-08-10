const { connect } = require('react-redux');
const { createStore, combineReducers } = require('redux');

function createActions(actions) {
  const actionCreators = {};

  for (const actionName of Object.getOwnPropertyNames(actions)) {
    actionCreators[actionName] = (payload) =>
        ({ type: actionName, payload });
  }

  return actionCreators;
}

function createContainer(component, methods) {
  return connect(
      (state) => state,
      createActions(methods)
  )(
      component
  );
}

function createReducer(name, methods, initialState) {
  return {
    [name](state = initialState, action = {}) {
      const {type = '', payload} = action;

      const actions = {
        ...methods,
      };

      if (type.startsWith('@@redux')) {
        return state;
      }

      if (actions[type]) {
        return actions[type](state, payload);
      }

      return state;
    }
  }
}

function createSimpleStore(...reducers) {
  const newReducers =
      reducers.reduce(
        (obj, reducer) => ({ ...obj, ...reducer }),
        {}
      );

  return createStore(combineReducers(newReducers));
}

module.exports = {
  createActions,
  createContainer,
  createReducer,
  createSimpleStore
};
