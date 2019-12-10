import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Modal from "../layout/Modal";

import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    showHealer: false
  };

  showHealerModal = () => {
    console.log("Show Healer");
    this.setState({ showHealer: true });
  };

  hideHealerModal = () => {
    console.log("Hide Healer");
    this.setState({ showHealer: false });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    //console.log(user);
    return (
      <div id="hubMainDiv">
        <div id="hubTitleLogoutDiv">
          <div id="hubTitleDiv">
            <h4>
              <b>Welcome to the HUB,</b> {user.name.split(" ")[0]}
            </h4>
          </div>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            >
              Logout
            </button>
          </div>
        </div>
        <div id="hubPlayerThingsDiv">
          <div id="chatDiv">Chat goes here</div>
          <div id="linksDiv">
            <div id="cityResources">
              <p>City Resources</p>
              <div id="resourceButtons">
                <div>
                  {/* Healer Button */}
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                    onClick={this.showHealerModal}
                  >
                    Healer
                  </button>
                  <Modal
                    show={this.state.showHealer}
                    handleClose={this.hideHealerModal}
                  >
                    <p>Healer</p>
                    <p>Tend your wounds for 50 fragments</p>
                  </Modal>

                  {/* Trainer Button */}
                  <br />
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Trainer
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Merchant Ring
                  </button>
                  <br />
                  <button
                    style={{
                      width: "220px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Crafting Square
                  </button>
                </div>
              </div>
            </div>
            <div id="cityExits">
              <p>City Exits</p>
              <div id="exitsButtons">
                <div>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Zone One
                  </button>
                  <br />
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Zone Two
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      width: "170px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Zone Three
                  </button>
                  <br />
                  <button
                    style={{
                      width: "170px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Zone Four
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
