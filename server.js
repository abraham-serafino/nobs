function frontEndServer(port, apiPort) {
  const WebpackDevServer = require('webpack-dev-server')
  const webpack = require('webpack')
  const config = require('./webpack.config.js')

  const compiler = webpack(config)

  const server = new WebpackDevServer(compiler, {
    contentBase: './public',
    publicPath: '/',
    stats: { colors: true },
    proxy: {
      '/socket.io/*': { target: `http://localhost:${apiPort}` }
    }
  })

  server.listen(port, 'localhost', function () {
    console.log(`WebpackDevServer running on port ${port}`)
  })
}

function backEndServer(port) {
  const app = require('express')()
  const http = require('http').Server(app)
  const io = require('socket.io')(http)
  const getModels = require('./lib/server/getModels')

  io.on('connection', socket => {
    console.log('a user connected')

    getModels(socket)
  })

  http.listen(port, () => {
    console.log(`socket.io listening on port ${port}`)
  })
}

frontEndServer(8080, 9001)
backEndServer(9001)
