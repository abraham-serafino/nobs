import requireDir from 'require-dir';
const services = requireDir('../models');

function getModels({ socket, db }) {
  for (const key of Object.keys(services)) {
    new services[key].default({ socket, db });
  }
}

export default getModels;
