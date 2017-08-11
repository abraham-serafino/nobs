import requireDir from 'require-dir';
const services = requireDir('../models');

function getModels({ socket, db }) {
  for (const key of Object.keys(services)) {
    let Constructor = services[key].default || services[key];
    new Constructor({ socket, db });
  }
}

export default getModels;
