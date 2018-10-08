import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import Resocket, {createResocketMiddleware} from "resocket";
import * as BackendActions from "../../common/actions";

const server = process.env.SERVER_HOST || 'localhost';
const port = process.env.SERVER_PORT || '8080';

// Setup resock middleware
const socket = Resocket.connect('http://'+server+':'+port);
const registerActions = [
  // Request actions
  BackendActions.REQUEST_CHANNEL_LIST,
  BackendActions.REQUEST_CHANNEL_CREATE,
  BackendActions.REQUEST_CHANNEL_DELETE,
  BackendActions.REQUEST_USER_REGISTER,
  BackendActions.REQUEST_USER_LIST,
  BackendActions.REQUEST_USER_DELETE,
  BackendActions.REQUEST_MESSAGE_POST
];
const resocketMiddleware = createResocketMiddleware(socket, registerActions);

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, resocketMiddleware)
);

export default configureStore
