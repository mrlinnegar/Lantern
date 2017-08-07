
const socketMiddleware = (function(){
  let socket = null;

  const onOpen = (ws, store, token) => event => {
    //store.dispatch(actions.connected());
  }

  const onClose = (ws, store) => event => {
    //store.dispatch(actions.disconnected());
  }

  const onMessage = (ws, store) => event => {
    const action = JSON.parse(event.data);
    if(action.type.indexOf('SERVER_') > -1) {
      store.dispatch(action);
    }
  }

  return store => next => action => {
    switch(action.type ){
      case 'CONNECT':
        if(socket != null) {
          socket.close();
        }
        socket = new WebSocket(action.url);
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store);
        socket.onopen = onOpen(socket, store, action.token);

        break;

      case 'DISCONNECT':
        if(socket != null) {
          socket.close();
        }
        socket = null;
        break;

      default:
        if(action.type.indexOf("SERVER_") > -1)
          socket.send(JSON.stringify(action));

        return next(action);
    }
  }
})();


module.exports = socketMiddleware;
