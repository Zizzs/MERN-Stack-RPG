import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/HUB");
    }
  }

  componentWillReceiveProps(nextProps) {
    // If the user is logged in then push user to dashboard when they login
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/HUB");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  forgotPasswordPage = () => {
    this.props.history.push("/emailreset");
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <div id="loginDiv">
        <Link to="/" className="button">
          <i className="material-icons left">keyboard_backspace</i> Back to home
        </Link>
        <div>
          <h4>
            <b>Login</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              style={{ backgroundColor: "white" }}
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              style={{ backgroundColor: "white" }}
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
          <p onClick={() => this.forgotPasswordPage()}>Forgot Password...</p>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
