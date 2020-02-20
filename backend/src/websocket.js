const socketio = require('socket.io');

exports.setupWebsocket = (server) => {
  const io = socketio(server);

  io.on('connection', socket => {
    console.log(socket.id);
    console.log(`so ${socket.handshake.query}`);

    setTimeout(() => {
      socket.emit('message', 'Hello World')
    }, 3000);
  });
};