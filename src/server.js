import express from 'express';
import http from 'http';
import socket from 'socket.io';
import babelify from 'babelify';
import browserify from 'express-browserify';

import getModels from './lib/server/getModels';

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  getModels({socket, db: null});
});

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'dev') {
  app.get('/client.js', browserify('./src/client.js', {
    transform: babelify.configure({
      presets: ['latest', 'stage-0', 'react'],
      plugins: ['transform-es2015-modules-commonjs']
    }),
    debug: true
  }));
}

server.listen(8080, () => {
  console.log('listening on :8080...');
});
