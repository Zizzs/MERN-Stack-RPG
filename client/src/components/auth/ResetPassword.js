import React, { Component } from "react";
import axios from "axios";
import "./ResetPassword.css";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
      update: false,
      isLoading: true,
      error: false
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.token);
    await axios
      .get("/api/confirmToken", {
        params: {
          resetPasswordToken: this.props.match.params.token
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.message === "good") {
          this.setState({
            username: response.data.username,
            email: response.data.email,
            update: false,
            isLoading: false,
            error: false
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put("/api/updatePassword", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message === "updated") {
          this.setState({
            updated: true,
            error: false
          });
        } else {
          this.setState({
            updated: false,
            error: true
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  redirectLocation = location => {
    this.props.history.push(location);
  };

  render() {
    const { password, error, isLoading, updated } = this.state;
    console.log(this.state);
    if (error) {
      return (
        <div className="resetPageContainer">
          <p>Problem Resetting Password... Send another link.</p>
          <button className="button" onClick={() => this.redirectLocation("/")}>
            Home
          </button>
          <button
            className="button loginButton"
            onClick={() => this.redirectLocation("/login")}
          >
            Login
          </button>
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="resetPageContainer">
          <p>Loading User Data...</p>
        </div>
      );
    } else if (updated) {
      return (
        <div className="resetPageContainer">
          <p>Password has been reset.</p>
          <button className="button" onClick={() => this.redirectLocation("/")}>
            Home
          </button>
          <button
            className="button loginButton"
            onClick={() => this.redirectLocation("/login")}
          >
            Login
          </button>
        </div>
      );
    } else {
      return (
        <div className="resetPageContainer">
          <h4>Username: {this.state.username}</h4>
          <p>Enter New Password...</p>
          <input
            type="text"
            id="passwordInputs"
            value={password}
            onChange={this.handleChange("password")}
          />
          <button className="button" onClick={e => this.updatePassword(e)}>
            Reset Password
          </button>
        </div>
      );
    }
  }
}

export default ResetPassword;
