const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const getModels = require('./lib/server/getModels')

const port = 9001;

io.on('connection', socket => {
  console.log('a user connected')
  getModels({ socket, db: null })
})

http.listen(port, () => {
  console.log(`socket.io listening on port ${port}`)
})
