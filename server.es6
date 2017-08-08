import express from 'express';
import http from 'http';
import socket from 'socket.io';
import browserify from 'express-browserify';

import getModels from './lib/server/getModels';

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
