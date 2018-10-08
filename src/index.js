import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './frontend/containers/Root'
import configureStore from './frontend/store/configureStore'
import './frontend/static/styles.css'

const store = configureStore();

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
