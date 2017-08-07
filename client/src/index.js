import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './App';
import lightsApp from './reducers'
import { connect, loadAnimations } from './actions'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const socketMiddleware = require('./services/websocket-service');

let store = createStore(lightsApp, {}, applyMiddleware(socketMiddleware));

const protocol = window.location.protocol.replace('http','ws')
const host = window.location.hostname;
const port = window.location.port;
store.dispatch(loadAnimations(['None', 'Chaser', 'Rider']));
store.dispatch(connect(`${protocol}//${host}:${port}/api`));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
