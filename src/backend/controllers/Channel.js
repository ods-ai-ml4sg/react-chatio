let BackendActions = require('../../common/actions/index');
let Channels = require('../models/Channels');

module.exports = {

  register: (socket) => {
    socket.on(BackendActions.REQUEST_CHANNEL_LIST, (payload) => {
      socket.emit(BackendActions.RESPONSE_CHANNEL,
        {
          type: BackendActions.RESPONSE_CHANNEL,
          payload: Channels.list()
        });
    });

    socket.on(BackendActions.REQUEST_CHANNEL_CREATE, (payload) => {
      return;
    });

    socket.on(BackendActions.REQUEST_CHANNEL_DELETE, (payload) => {
      return;
    });
  }
};