const { App } = require('./lib/client/components/App');
import { appState } from './lib/client/stores/appState';
import { createSimpleStore } from './lib/client/stores/SimpleStore';
import { employeeList } from './lib/client/stores/employeeList';
const Post = require('./lib/models/Post');
const React = require('react');
const { render } = require('react-dom');

const store = createSimpleStore(employeeList, appState);

const socket = window.io();

socket.on('reconnect', () => {
  window.location.reload();
});

new Post({ socket, db: null }).say('Hello world');

render(
  <App store={store} />,
  document.querySelector('#app')
);
