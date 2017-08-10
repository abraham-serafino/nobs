const SuperModel = require('../SuperModel');

class Post extends SuperModel {
  constructor({ socket, db }) {
    super('Post', Post, socket);
  }

  say(message) {
    console.log(message);
  }
}

module.exports = Post;
