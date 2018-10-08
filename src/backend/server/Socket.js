import SocketIO from 'socket.io';
import Channel from '../controllers/Channel';
import User from '../controllers/User';
import Message from '../controllers/Message';
import Logging from '../components/Logging';

module.exports = function (server) {
  const io = new SocketIO(server);

  io.on('connection', function (socket) {

    // Register actions controllers
    User.register(socket);
    Channel.register(socket);
    Message.register(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      User.disconnected(socket);
    });

  });
};
