import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import VoidAnimation from "./VoidAnimation";
import PropTypes from "prop-types";
import "./Landing.css";

class Landing extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/HUB");
    }
  }
  render() {
    return (
      <div id="landingGridContainer">
        <VoidAnimation />
        <div id="welcomeDiv">
          <h4>Welcome to Void</h4>
          <p>
            <i>
              Explore the lands of the void and reap the spoils of the
              Celestials...
            </i>
          </p>
        </div>

        <div>
          <Link
            to="/register"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
            className="btn btn-large waves-effect waves-light hoverable #1a237e indigo darken-4"
          >
            Register
          </Link>

          <Link
            to="/login"
            id="loginButton"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
            className="btn btn-large btn-flat waves-effect white black-text"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Landing);
