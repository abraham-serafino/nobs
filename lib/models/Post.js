const SuperModel = require('../SuperModel.js');

function Post(socket) {
  return SuperModel('Post', {
    createPost() {
      console.log('Hello world!')
    }
  }, socket)
}

module.exports = Post
