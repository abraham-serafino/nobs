const browserify = require('express-browserify');
const express = require('express');
const getModels = require('./lib/server/getModels');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  getModels({ socket, db: null });
});

app.use(express.static(`${__dirname}/public`));
app.get('/client.js', browserify('./client.js'));

server.listen(8080, () => {
  console.log('listening on :8080...');
});
