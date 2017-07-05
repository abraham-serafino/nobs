const socket = require('socket.io-client')()
const Post = require('./lib/models/Post')

new Post({socket, db: null}).createPost()
