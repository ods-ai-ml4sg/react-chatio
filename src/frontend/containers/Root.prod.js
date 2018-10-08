import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Register from "./Register";

const Root = ({store}) => (
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
