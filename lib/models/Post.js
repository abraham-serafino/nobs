const SuperModel = require('../SuperModel.js')

class Post extends SuperModel {
  constructor({ socket, db }) {
    super('Post', Post, socket)
  }

  createPost() {
    console.log('Hello world!')
  }
}

module.exports = Post
