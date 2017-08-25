import {
  SERVER_ADD_LIGHT,
  SERVER_REMOVE_LIGHT,
  SERVER_UPDATE_LIGHT,
  SERVER_ALL_LIGHTS,
  SERVER_LIGHT_COLOR,
  SERVER_TOGGLE_LIGHT,
  SERVER_LIGHT_ANIMATION,
} from './actions';

import lightDataValidator from './validators/validators';

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
    const lights = lighting.getLights();
    ws.send(JSON.stringify({ type: SERVER_ALL_LIGHTS, data: lights }));

    ws.on('message', (message) => {
      try {
        const action = JSON.parse(message);

        switch (action.type) {
          case SERVER_LIGHT_COLOR: {
            try {
              const coloredLight = lighting.getLightById(action.id);
              const validatedInput = lightDataValidator(action);
              coloredLight.update(validatedInput);

              wss.clients.forEach((client) => {
                if(client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ type: 'SERVER_UPDATE_LIGHT', light: coloredLight.getData() }))
                }
              });

            } catch (e) {
              console.warn(e);
            }
            break;
          }

          case SERVER_LIGHT_ANIMATION: {
            try {
              const light = lighting.getLightById(action.id);
              const validatedInput = lightDataValidator(action);
              light.update(validatedInput);

              wss.clients.forEach((client) => {
                if(client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ type: 'SERVER_UPDATE_LIGHT', light: coloredLight.getData() }))
                }
              });

            } catch (e) {
              console.warn(e);
            }
            break;
          }

          case SERVER_TOGGLE_LIGHT: {
            const toggledLight = lighting.getLightById(action.id);
            const newStatus = toggledLight.isOn() ? 0 : 1;
            toggledLight.update({ status: newStatus });

            wss.clients.forEach((client) => {
              if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'SERVER_UPDATE_LIGHT', light: toggledLight.getData() }))
              }
            });

            break;
          }
          default: {
            break;
          }
        }
      } catch(e){
        console.log('invalid input', e);
      }
    });

  });
  return wss;
}


module.exports = {
  createWSServer: createServer
}
