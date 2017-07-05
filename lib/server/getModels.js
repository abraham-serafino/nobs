const requireDir = require('require-dir')
const services = requireDir('../models')

function getModels(socket) {
  for (const key of Object.keys(services)) {
    services[key](socket)
  }
}

module.exports = getModels
