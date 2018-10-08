var Profiles = require('../models/Profiles.js');
let BackendActions = require('../../common/actions/index');
let Message = require('../models/Message');

module.exports = {
  register: (socket) => {

    socket.on(BackendActions.REQUEST_MESSAGE_POST, (payload) => {
      try {
        let message = Message.generate(
          Profiles.getById(socket.id),
          payload.channel,
          payload.message);

        // Send to sender itself
        socket.emit(BackendActions.RESPONSE_MESSAGE,
          {
            type: BackendActions.RESPONSE_MESSAGE_SELF,
            payload: message
          });

        // Send to all except sender
        socket.broadcast.emit(BackendActions.RESPONSE_MESSAGE,
          {
            type: BackendActions.RESPONSE_MESSAGE,
            payload: message
          });
      } catch (e) {

      }
    });

  }
};
