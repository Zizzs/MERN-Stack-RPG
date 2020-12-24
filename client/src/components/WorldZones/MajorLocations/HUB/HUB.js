import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HubImage from "../../../../images/cosmicCity.png";

import { saveUser, saveLocalUser } from "../../../../actions/authActions";
import { logoutUser } from "../../../../actions/authActions";
import { setLocation} from "../../../../actions/locationActions";
import { healUser } from "../../../../actions/beneficialActions";

import "./HUB.css";

class HUB extends Component {
  state = {
    showHealer: false,
    location: "/Zone/HUB",
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

  healerAction = () => {
    let user = this.props.auth.user;
    healUser(user, 25);
    saveUser(user);
    this.props.updateWrapperAction(`Heal`);
  }

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
                      this.props.createItem(e);
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
                      this.props.redirectToWorldZone("/Zone/CrystalForest", "Spire Path");
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
                    this.props.redirectToWorldZone("", "/Zone/CelestialTower");
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
