import {
  SERVER_ADD_LIGHT,
  SERVER_REMOVE_LIGHT,
  SERVER_UPDATE_LIGHT,
  SERVER_ALL_LIGHTS,
} from './actions';

const WebSocket = require('ws');


const createServer = (server, lighting)=> {

  const wss = new WebSocket.Server({ server });

  function bindObservers() {
    lighting.addObserver(SERVER_ADD_LIGHT, (newLight) => {
      wss.broadcast(JSON.stringify({ type: SERVER_ADD_LIGHT, light: newLight }));
    });

    lighting.addObserver(SERVER_REMOVE_LIGHT, (id) => {
      wss.broadcast(JSON.stringify({ type: SERVER_REMOVE_LIGHT, id }));
    });

    lighting.addObserver(SERVER_UPDATE_LIGHT, (updatedLight) => {
      wss.broadcast(JSON.stringify({ type: SERVER_UPDATE_LIGHT, light: updatedLight }));
    });
  }

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  };

  bindObservers();


  wss.on('connection', (ws, req) => {
    const lights = lighting.getLightsData();
    ws.send(JSON.stringify({ type: SERVER_ALL_LIGHTS, data: lights }));
  });

  return wss;
}


module.exports = {
  createWSServer: createServer
}
