import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailSent: false,
      showError: false,
      messageFromServer: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  goHome = e => {
    e.preventDefault();
    this.props.history.push("/");
  };

  sendEmail = e => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true
      });
    } else {
      axios
        .post("/api/sendPasswordEmail", {
          email: email
        })
        .then(res => {
          console.log(res.data);
          if (res.data === "email not in db") {
            this.setState({
              showError: true,
              messageFromServer: ""
            });
          } else if (res.data === "recovery email sent") {
            this.setState({
              showError: false,
              emailSent: true,
              messageFromServer: "Recovery Email Sent"
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  };

  render() {
    const {
      email,
      emailSent,
      messageFromServer,
      showNullError,
      showError
    } = this.state;
    if (emailSent) {
      return (
        <div className="forgotPasswordContainer">
          <p>
            Email has been sent. Please check for the email and use the link to
            reset your password...
          </p>
          <button className="button" onClick={e => this.goHome(e)}>
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </button>
        </div>
      );
    } else {
      return (
        <div className="forgotPasswordContainer">
          <h4>Enter Email...</h4>
          <input
            type="text"
            id="emailInput"
            value={email}
            onChange={this.handleChange("email")}
          />
          <button className="button" onClick={e => this.sendEmail(e)}>
            Send Reset Email
          </button>
        </div>
      );
    }
  }
}

export default ForgotPassword;
