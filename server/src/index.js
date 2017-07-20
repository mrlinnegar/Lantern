import express from 'express';
import bodyparser from 'body-parser';
import light from './routes/Lights';

import LightingController from './controllers/LightingController';
import lightDataValidator from './validators/validators';
import LightBroker from './lib/LightBroker';

const SERVER_LIGHT_COLOR = 'SERVER_LIGHT_COLOR';
const SERVER_TOGGLE_LIGHT = 'SERVER_TOGGLE_LIGHT';

const lighting = new LightingController(new LightBroker());

const app = express();

app.use(express.static('public'));

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/lights', light(lighting));

const server = app.listen(3001, () => {
  console.log('Listening on %d', 3001);
});

const io = require('socket.io').listen(server);

lighting.addObserver('SERVER_ADD_LIGHT', (newLight) => {
  io.sockets.emit('action', { type: 'SERVER_ADD_LIGHT', light: newLight });
});

lighting.addObserver('SERVER_REMOVE_LIGHT', (id) => {
  io.sockets.emit('action', { type: 'SERVER_REMOVE_LIGHT', id });
});

lighting.addObserver('SERVER_UPDATE_LIGHT', (updatedLight) => {
  io.sockets.emit('action', { type: 'SERVER_UPDATE_LIGHT', light: updatedLight });
});

io.on('connection', (socket) => {
  const lights = lighting.getLights();
  socket.emit('action', { type: 'SERVER_ALL_LIGHTS', data: lights });

  socket.on('action', (action) => {
    switch (action.type) {
      case SERVER_LIGHT_COLOR: {
        try {
          const coloredLight = lighting.getLightById(action.id);
          const validatedInput = lightDataValidator(action);
          coloredLight.update(validatedInput);
          socket.broadcast.emit('action', { type: 'SERVER_UPDATE_LIGHT', light: coloredLight.getData() });
        } catch (e) {
          console.warn(e);
        }
        break;
      }
      case SERVER_TOGGLE_LIGHT: {
        const toggledLight = lighting.getLightById(action.id);
        const newStatus = toggledLight.isOn() ? 0 : 1;
        toggledLight.update({ status: newStatus });
        socket.broadcast.emit('action', { type: 'SERVER_UPDATE_LIGHT', light: toggledLight.getData() });
        break;
      }
      default: {
        break;
      }
    }
  });
});
