const socket = require('socket.io-client')()
const Post = require('./lib/models/Post')(socket)

Post.createPost()
