import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HubImage from "../../images/cosmicCity.png";

import { saveUser } from "../../actions/authActions";
import { logoutUser } from "../../actions/authActions";
import { giveUserItem } from "../../actions/itemActions";
import { getUser } from "../../actions/authActions";
import { setLocation } from "../../actions/locationActions";

import "./HUB.css";

class HUB extends Component {
  state = {
    showHealer: false,
    saved: false,
    location: "/HUB"
  };

  componentDidMount() {
    // ------ Location Redirect and Save ------ Required for every use.
    const { user } = this.props.auth;
    console.log(user);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (user.character.location !== this.state.location) {
      this.props.history.push(user.character.location);
    }
    if (this.state.saved === false) {
      saveUser(user);
      this.setState({ saved: true });
    }
  }

  redirectLocation = location => {
    const { user } = this.props.auth;
    console.log(`Sending ${user.name} to ${location}.`);
    setLocation(user, location);
    this.props.history.push(location);
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

  giveItem = e => {
    e.preventDefault();
    let user = this.props.auth.user;
    giveUserItem(user, {
      name: "Flaming Sword",
      type: "Sword"
    });
    console.log("Gave user item");
  };

  consoleLogUser = () => {
    let user = this.props.auth.user;
    console.log(user.character.items);
  };

  render() {
    //console.log(this.props.auth);
    const { user } = this.props.auth;
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
          <div id="hubImageDiv">
            <img alt="Cosmic City" src={HubImage} />
          </div>
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
                    onClick={this.consoleLogUser}
                  >
                    Healer
                  </button>
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
                  {/* Merchant Button */}
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                    onClick={this.giveItem}
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
              <div id="exitButtons">
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
                    Crystal Forest
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
            <div id="cityDungeons">
              <p>Challenges</p>
              <div id="dungeonsButtons">
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  onClick={() => {
                    this.redirectLocation("/HUB/CelestialTower");
                  }}
                >
                  Celestial Tower
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HUB.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logoutUser,
  getUser,
  setLocation,
  saveUser
})(withRouter(HUB));
