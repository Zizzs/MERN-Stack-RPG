import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HubImage from "../../images/cosmicCity.png";

import { saveUser, saveLocalUser } from "../../actions/authActions";
import { logoutUser } from "../../actions/authActions";
import { giveUserItem } from "../../actions/itemActions";
import { setLocation } from "../../actions/locationActions";

import "./HUB.css";

class HUB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHealer: false,
      saved: false,
      location: "/HUB"
    };
  }

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
  }

  redirectLocation = location => {
    let user = this.props.auth.user;
    console.log(`Sending ${user.name} to ${location}.`);
    setLocation(user, location);
    user = this.props.auth.user;
    saveLocalUser(user);
    saveUser(user);
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
    logoutUser();
    window.location.reload(false);
  };

  giveItem = e => {
    e.preventDefault();
    let user = this.props.auth.user;
    giveUserItem(user, {
      name: "Flaming Sword",
      type: "Sword"
    });
    user = this.props.auth.user;
    console.log(user);
    saveUser(user);
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
                  onClick={e => {
                    e.preventDefault();
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
  //logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // setLocation: PropTypes.func.isRequired,
  // saveUser: PropTypes.func.isRequired,
  // saveLocalUser: PropTypes.func.isRequired,
  // getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
    setLocation,
    saveUser,
    saveLocalUser: user => {
      dispatch(saveLocalUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HUB));
