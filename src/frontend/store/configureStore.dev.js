import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Resocket, { createResocketMiddleware } from 'resocket'
import rootReducer from '../reducers/index'
import DevTools from '../containers/DevTools'
import * as BackendActions from '../../common/actions/index'

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

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, resocketMiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
};

export default configureStore
