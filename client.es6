import Post from './lib/models/Post';

const socket = window.io();

socket.on('reconnect', () => {
  window.location.reload();
});

new Post({ socket, db: null }).say('Hello world');
