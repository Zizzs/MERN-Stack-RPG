import React, { Component } from "react";
import axios from "axios";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      showError: false,
      messageFromServer: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
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
              messageFromServer: "recovery email sent"
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    return (
      <div>
        <p>Enter Email...</p>
        <input
          type="text"
          id="emailInput"
          value={email}
          onChange={this.handleChange("email")}
        />
        <button onClick={e => this.sendEmail(e)}>Send Reset Email</button>
      </div>
    );
  }
}

export default ForgotPassword;
