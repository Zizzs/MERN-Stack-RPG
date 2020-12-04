import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HubImage from "../../images/cosmicCity.png";

import { saveUser, saveLocalUser } from "../../actions/authActions";
import { logoutUser } from "../../actions/authActions";
import { giveUserItem, generateItem } from "../../actions/itemActions";
import { setLocation, setSubLocation } from "../../actions/locationActions";
import { healUser } from "../../actions/beneficialActions";

import "./HUB.css";

class HUB extends Component {
  state = {
    showHealer: false,
    location: "/HUB",
  };

  componentDidMount() {
    // ------ Location Redirect and Save ------ Required for every use.
    const { user } = this.props.auth;

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (this.checkObj(user.character)) {
      if (user.character.location !== this.state.location) {
        console.log("User in wrong place!");
        //this.props.history.push(user.character.location);
      }
    }
  }

  redirectToWorldZone = (location, subLocation) => {
    let user = this.props.auth.user;
    console.log(`Sending ${user.name} to ${location}/${subLocation}.`);
    setLocation(user, location);
    setSubLocation(user, subLocation);
    user = this.props.auth.user;
    saveLocalUser(user);
    saveUser(user);
    this.props.history.push(location);
  };

  redirectLocation = (location) => {
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

  onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.reload(false);
  };

  createItem = (e) => {
    e.preventDefault();
    let user = this.props.auth.user;
    generateItem(1, "Weapon", "Dagger", 1.0, "", "").then((response) => {
      giveUserItem(user, response.data.item);
      this.props.updateWrapperAction(`Gained Item`);
    });

  };

  healerAction = () => {
    let user = this.props.auth.user;
    healUser(user, 25);
    saveUser(user);
    this.props.updateWrapperAction(`Heal`);
  }

  checkObj = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div id="hubContainer">
        <div id="hubTitleLogoutDiv">
          <div id="hubTitleDiv">
            <h4>
              <b>Welcome to the HUB,</b> {user.name.split(" ")[0]}
            </h4>
          </div>
          <div>
            <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1px",
                marginTop: "1rem",
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
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                    onClick={() => this.healerAction()}
                  >
                    Healer
                  </button>
                  {/* Trainer Button */}
                  <br />
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
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
                      letterSpacing: "1px",
                      marginTop: "1rem",
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                    onClick={(e) => {
                      this.createItem(e);
                    }}
                  >
                    Merchant Ring
                  </button>
                  <br />
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
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
                      letterSpacing: "1px",
                      marginTop: "1rem",
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                    onClick={(e) => {
                      e.preventDefault();
                      this.redirectToWorldZone("/Zone/CrystalForest", "Spire Path");
                    }}
                  >
                    Crystal Forest
                  </button>
                  <br />
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Zone Two
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
                    }}
                    className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                  >
                    Zone Three
                  </button>
                  <br />
                  <button
                    style={{
                      width: "200px",
                      borderRadius: "3px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
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
                  onClick={(e) => {
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
    setLocation,
    saveUser,
    saveLocalUser: (user) => {
      dispatch(saveLocalUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HUB));
