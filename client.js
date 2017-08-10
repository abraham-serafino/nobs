'use strict';

var _appState = require('./lib/client/stores/appState');

var _SimpleStore = require('./lib/client/stores/SimpleStore');

var _employeeList = require('./lib/client/stores/employeeList');

var _require = require('./lib/client/components/App'),
    App = _require.App;

var Post = require('./lib/models/Post');
var React = require('react');

var _require2 = require('react-dom'),
    render = _require2.render;

var store = (0, _SimpleStore.createSimpleStore)(_employeeList.employeeList, _appState.appState);

var socket = window.io();

socket.on('reconnect', function () {
  window.location.reload();
});

new Post({ socket: socket, db: null }).say('Hello world');

render(React.createElement(App, { store: store }), document.querySelector('#app'));