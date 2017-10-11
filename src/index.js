import LightRespository from './controllers/LightRespository';
import LightBroker from './lib/LightBroker';

const http = require('http');
const socketServer = require('./WebsocketServer');
const application = require('./app');
const lighting = new LightRespository(new LightBroker());

const app    = application.createApplication(lighting);
const server = http.createServer(app);
const socket = socketServer.createWSServer(server, lighting);

server.listen(3001, () => {
    console.log('received: %s', server.address().port);
});
