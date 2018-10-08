import * as ActionTypes from '../../common/actions/index'
import merge from 'lodash/merge' // Or Object.assign() ?
import clone from 'lodash/merge'
import {combineReducers} from 'redux'
import * as ActionsTypes from "../../common/actions";

// https://redux.js.org/faq/performance
// Common Redux misconception: you need to deeply clone the state.
// Reality: if something inside doesn't change, keep its reference the same!

const channels = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RESPONSE_CHANNEL:
      return action.payload;
    case ActionTypes.RESPONSE_MESSAGE:
      const {channel} = action.payload;
      const index = state.map(e => e.name).indexOf(channel);
      state[index].meta.unread++;
      return state;
    case ActionsTypes.CHANNEL_RESET_UNREAD:
      const chan = action.channel;
      const ind = state.map(e => e.name).indexOf(chan);
      state[ind].meta.unread=0;
      return state;
    default:
      return state
  }
};

const userInitialState = {
  users: [],
  isRegistered: false
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case ActionTypes.RESPONSE_USER_REGISTER:
      return {
        users: action.payload,
        isRegistered: true
      };
    case ActionTypes.RESPONSE_USER_UPDATE:
      return {
        users: action.payload,
        isRegistered: state.isRegistered
      };
    default:
      return state
  }
};

const messages = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RESPONSE_CHANNEL:
      let newState = clone(state);

      // TODO refactor this hack
      // need to iterate in order to drop non-existing channels
      action.payload.map(channel => {
        if (state[channel.name]) {
          newState[channel.name] = state[channel.name];
        } else {
          // Create new channel messages
          newState[channel.name] = []
        }
        return null;
      });

      return newState;

    case ActionTypes.CHANNEL_DELETE:
      let deleteState = clone(state);
      return delete deleteState[action.arg];

    case ActionTypes.RESPONSE_MESSAGE_SELF:
    case ActionTypes.RESPONSE_MESSAGE:
      const {channel} = action.payload;
      return merge({}, state, {[channel]: [...state[channel], action.payload]});
      // equivalent
      // return {
      // ...state,
      //   [channel]: [...state[channel], message]
      // };
    default:
      return state
  }
};

const initialError = {
  isError: false,
  errorMessage: ''
};

// Updates error message to notify about the failed fetches.
const error = (state = initialError, action) => {
  const {type, payload} = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return initialError
  } else if (type === ActionTypes.RESPONSE_ERROR) {
    let newState = {
      isError: true,
      errorMessage: payload
    };
    return newState;
  }

  return state
};

const rootReducer = combineReducers({
  user,
  channels,
  messages,
  error
});

export default rootReducer
