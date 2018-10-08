let BackendActions = require('../../common/actions/index');
let Profiles = require('../models/Profiles');
let Accounting = require('../aaa/Accounting');
let Authorize = require('../aaa/Authorize');

module.exports = {

  register: (socket) => {
    socket.on(BackendActions.REQUEST_USER_REGISTER, (payload) => {
      // Schema should be used here
      let message = {};

      // Logging

      try {
        Authorize.isActionAllowed(
          BackendActions.REQUEST_USER_REGISTER,
          payload.user
        );

        Profiles.add(socket.id, payload.user);

        message = {
          type: BackendActions.RESPONSE_USER_REGISTER,
          payload: Profiles.get()
        };

        // Do billing if didn't catch exception
        Accounting.userRegister(payload.user);

      } catch (e) {
        message = {
          type: BackendActions.RESPONSE_ERROR,
          payload: e.message
        };
      }

      // Emit back to client
      socket.emit(message.type, message);
      // Broadcast to others about new client
      message = {
        type: BackendActions.RESPONSE_USER_UPDATE,
        payload: Profiles.get()
      };
      socket.broadcast.emit(message.type, message);
    });
  },

  disconnected: (socket) => {
    Profiles.remove(socket.id);
    // Broadcast to others about new client
    let message = {
      type: BackendActions.RESPONSE_USER_UPDATE,
      payload: Profiles.get()
    };
    socket.broadcast.emit(message.type, message);
  }

};
