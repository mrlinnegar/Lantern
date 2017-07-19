
import express from 'express';
import light from './routes/light';
import bodyparser from 'body-parser';
import LightingController from './controllers/LightingController';
import lightDataValidator from './validators/validators'
import LightBroker from './lib/LightBroker';

let lighting = new LightingController( new LightBroker() );

const app = express();

app.use(express.static('public'))

app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/lights', light(lighting));

const server = app.listen(3001, () => {
   console.log('Listening on %d', 3001);
});

const io = require('socket.io').listen(server);

lighting.addObserver('SERVER_ADD_LIGHT', (light)=> {
  io.sockets.emit('action', { type: 'SERVER_ADD_LIGHT', light: light })
})

lighting.addObserver('SERVER_REMOVE_LIGHT', (id)=> {
  io.sockets.emit('action', { type: 'SERVER_REMOVE_LIGHT', id })
})

lighting.addObserver('SERVER_UPDATE_LIGHT', (light)=> {
  io.sockets.emit('action', { type: 'SERVER_UPDATE_LIGHT', light })
})

io.on('connection', (socket) => {

  const lights = lighting.getLights()
  socket.emit('action', {type:'SERVER_ALL_LIGHTS', data: lights});

  socket.on('action', (action)=>{
    let light

    switch (action.type) {
      case 'SERVER_LIGHT_COLOR':
        try {
          light = lighting.getLightById(action.id)
          const validatedInput = lightDataValidator(action);
          light.update(validatedInput)
          socket.broadcast.emit('action', {type: 'SERVER_UPDATE_LIGHT', light: light.getData()})
        } catch(e){

        }
        break;

      case 'SERVER_TOGGLE_LIGHT':
        light = lighting.getLightById(action.id)
        const newStatus = (light.isOn() ? 0 : 1 );
        light.update({status:newStatus});
        socket.broadcast.emit('action', {type: 'SERVER_UPDATE_LIGHT', light: light.getData()})
        break;

      default:
        break;
    }

  });

});
