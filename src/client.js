import Post from './lib/models/Post';
import io from 'socket.io-client';

const socket = io();

socket.on('reconnect', () => {
  window.location.reload();
});

new Post({ socket, db: null }).say('Hello world');
