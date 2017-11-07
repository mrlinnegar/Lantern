import LightingController from './controllers/LightingController';
import LightBroker from './lib/LightBroker';
import createApplication from './app'

const http = require('http');
const socketServer = require('./WebsocketServer');
const lightController = new LightingController(new LightBroker());

const app    = createApplication(lightController);
const server = http.createServer(app);
const socket = socketServer.createWSServer(server, lightController);

server.listen(3001, () => {
    console.log('received: %s', server.address().port);
});
