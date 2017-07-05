const requireDir = require('require-dir')
const services = requireDir('../models')

function getModels({ socket, db }) {
  for (const key of Object.keys(services)) {
    new services[key]({ socket, db })
  }
}

module.exports = getModels
