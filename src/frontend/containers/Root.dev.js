import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Register from './Register'
import Dashboard from "./Dashboard";

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"
                 component={Register} />
          <Route exact path="/chat"
                 component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root
