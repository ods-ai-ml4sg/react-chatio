import * as ActionsTypes from '../../common/actions/index';

export const channelList = () => ({
  type: ActionsTypes.REQUEST_CHANNEL_LIST
});

export const channelCreate = (channel) => ({
  type: ActionsTypes.CHANNEL_CREATE,
  payload: channel
});

export const channelDelete = (channel) => ({
  type: ActionsTypes.CHANNEL_DELETE,
  payload: channel
});

export const messagePost = (channel, message) => ({
  type: ActionsTypes.REQUEST_MESSAGE_POST,
  payload: {
    channel: channel,
    message: message
  }
});

export const resetChannelUnread = (channel) => ({
  type: ActionsTypes.CHANNEL_RESET_UNREAD,
  channel: channel
});

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: ActionsTypes.RESET_ERROR_MESSAGE
});

export const userRegister = (user) => ({
  type: ActionsTypes.REQUEST_USER_REGISTER,
  payload: {
    user: user
  }
});

// resock middleware actions
export const addListenersTo = (payload) =>({
  type: ActionsTypes.ADD_LISTENERS_TO,
  payload: payload
});

export const removeListenersFrom = (payload) => {
  return {
    type: ActionsTypes.REMOVE_LISTENER_FROM,
    payload,
  };
};

export const removeAllListeners = () => {
  return {
    type: ActionsTypes.REMOVE_ALL_LISTENERS,
  };
};