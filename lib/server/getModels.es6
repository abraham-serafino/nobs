const requireDir = require('require-dir');
const services = requireDir('../models');

function getModels({ socket, db }) {
  for (const key of Object.keys(services)) {
    console.log(services);
    console.log(services[key]);
    new services[key]({ socket, db });
  }
}

module.exports = getModels;
