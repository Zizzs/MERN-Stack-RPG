import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCharacterData } from "../../actions/authActions";

import "./Wrapper.css";

import PrivateRoute from "../private-route/PrivateRoute";
import Navbar from "../layout/Navbar";
import Landing from "../layout/Landing";
import Register from "../auth/Register";
import Login from "../auth/Login";

import ZoneController from "../WorldZones/ZoneController";

import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";

import { v4 as uuidv4 } from 'uuid';

class Wrapper extends Component {
  state = {
    characterValid: false,
    userLoggedIn: false,
    userValid: false,
    checks: 0,
    previousAction: "",
  };

  componentDidMount() {
    const { user } = this.props.auth;
    console.log("Getting User First");
    this.props.getCharacterData(user);
  }

  componentDidUpdate() {
    const { user } = this.props.auth;
    //console.log(user);

    // This series of checks makes sure that the user is logged in.
    // These checks are to make sure that a user exists before entering the PrivateRoute proper (Containing HUB and other pages).
    // If characterIsValid is equal to False, and userIsLoggedIn is true, then the user will be sent to a "Character Loading" page.
    // If they're both true, it'll load the HUB
    //
    // First - It checks if the user is logged in, and has a valid character.
    //     If both of these are false (As it would be on initial login), it hits the else statement. 
    // Second - If the user is logged in, we can assume the character is valid as well, as it's retrieved when the component is mounted.
    //     This sets characterValid to true and sends the the Wrapper renders the correct location.
    // Third - If the user does not exist, but for some reason userLoggedIn is true (Due to a bug, or whatever), it sets userLoggedIn to false, which would send them to the login page.
    // Fourth - If the user object exists, but somehow didn't flag the userValid bool, they're both set to true.
    // Fifth - If somehow, something goes wrong in these above checks and the user is logged in, but without character data, it'll hit the initial truthy if statement and get the character data.

    // All of these checks are purely to make the app responsive, allowing it to have a loading page if the character data is being retrieved, and to swap to the main pages when it is done. This is to prevent issues with latency retrieving data from the database, as React will crash if the data retrieval is too slow.
    if (
      this.checkObj(user.character) === false &&
      this.state.userLoggedIn === true
    ) {
      console.log("Getting User Second");
      this.props.getCharacterData(user);
    } else {
      if (
        this.state.characterValid === false &&
        this.state.userLoggedIn === true
      ) {
        console.log("Valid User");
        this.setState({ characterValid: true });
      }
    }

    if (this.checkObj(user) === false) {
      console.log("No user");
      if (this.state.userLoggedIn !== false) {
        this.setState({ userLoggedIn: false });
      }
    } else if (this.checkObj(user) === true && this.state.userValid === false) {
      this.setState({ userLoggedIn: true, userValid: true });
    }
  }


  // Updates the Wrapper with the current player action, so that it may refresh the pages and update any relevant information. It is given an action in the form of a string. This is set to the "previousAction" state. This state is then passed onto the Navbar, so that the navbar will update with the current stats of the user (Health and others)
  updatePreviousAction = (action) => {
    console.log(`Updated action: ${action}}`)
    let modifiedAction = `${action}:${uuidv4()}`;
    this.setState({previousAction: modifiedAction});
  }

  checkObj = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  render() {
    //console.log(this.state.characterValid);
    //console.log(this.state.userLoggedIn);
    if (
      this.state.characterValid === false &&
      this.state.userLoggedIn === true
    ) {
      return (
        <div>
          <p>Loading Character...</p>
        </div>
      );
    } else {
      return (
        <Router>
          <div className="container">
            <div>
              <Navbar updateWrapperAction={this.updatePreviousAction} previousAction={this.state.previousAction}/>
            </div>
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/emailreset" component={ForgotPassword} />
              <Route path="/reset/:token" component={ResetPassword} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/Zone/*"
                  component={ZoneController}
                  updateWrapperAction={this.updatePreviousAction}
                />
              </Switch>
            </div>
          </div>
        </Router>
      );
    }
  }
}

Wrapper.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCharacterData: (user) => {
      getCharacterData(user, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
