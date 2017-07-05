function SuperModel(name, model, socket) {
  const instance = Object.assign(model);

  Object.keys(model).forEach(key => {
    if (typeof model[key] == 'function') {
      socket.on(`${name}.${key}`, model[key]);
      instance[key] = () => socket.emit(`${name}.${key}`);
    }
  });

  return instance;
}

module.exports = SuperModel;