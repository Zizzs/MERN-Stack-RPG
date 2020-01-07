import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar from "../layout/Navbar";
import Landing from "../layout/Landing";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "../private-route/PrivateRoute";
import HUB from "../HUB/HUB";
import CelestialTower from "../Dungeons/CelestialTower";
import Combat from "../Combat/Combat";

class Wrapper extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/HUB" component={HUB} />
            <PrivateRoute
              exact
              path="/HUB/CelestialTower"
              component={CelestialTower}
            />
            <PrivateRoute
              exact
              path="/HUB/CelestialTower/Combat"
              component={Combat}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

Wrapper.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Wrapper);
