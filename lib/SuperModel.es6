class SuperModel {
  constructor(name, model, socket) {
    for (const key of Object.getOwnPropertyNames(model.prototype)) {
      if (typeof model.prototype[key] === 'function') {
        socket.on(`${name}.${key}`, model.prototype[key].bind(this));

        this[key] = (...args) => {
          model.prototype[key].call(this, ...args);
          socket.emit(`${name}.${key}`, ...args);
        }
      }
    }
  }
}

module.exports = SuperModel;
