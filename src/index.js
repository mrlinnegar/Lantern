import express from 'express';
import bodyparser from 'body-parser';
import light from './routes/Lights';
import animations from './routes/Animations';

import LightingController from './controllers/LightingController';
import lightDataValidator from './validators/validators';
import LightBroker from './lib/LightBroker';

const WebSocket = require('ws');
const http = require('http');

const SERVER_LIGHT_COLOR = 'SERVER_LIGHT_COLOR';
const SERVER_TOGGLE_LIGHT = 'SERVER_TOGGLE_LIGHT';
const SERVER_LIGHT_ANIMATION  = 'SERVER_LIGHT_ANIMATION';

const lighting = new LightingController(new LightBroker());

const app = express();

app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/lights', light(lighting));
app.use('/api/animations', animations())
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
};

lighting.addObserver('SERVER_ADD_LIGHT', (newLight) => {
  wss.broadcast(JSON.stringify({ type: 'SERVER_ADD_LIGHT', light: newLight }));
});

lighting.addObserver('SERVER_REMOVE_LIGHT', (id) => {
  wss.broadcast(JSON.stringify({ type: 'SERVER_REMOVE_LIGHT', id }));
});

lighting.addObserver('SERVER_UPDATE_LIGHT', (updatedLight) => {
  wss.broadcast(JSON.stringify({ type: 'SERVER_UPDATE_LIGHT', light: updatedLight }));
});


wss.on('connection', (ws, req) => {
  const lights = lighting.getLights();
  ws.send(JSON.stringify({ type: 'SERVER_ALL_LIGHTS', data: lights }));

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

server.listen(3001, () => {
    console.log('received: %s', server.address().port);
});
