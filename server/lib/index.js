
import express from 'express';
import light from './routes/light';
import bodyparser from 'body-parser';
import LightingController from './controllers/LightingController';


let lighting = new LightingController();

const app = express();


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


io.on('connection', (socket) => {
  socket.emit('lights', lighting.getLights());

  socket.on('event', (data)=>{
    console.log(data);
  });
});
