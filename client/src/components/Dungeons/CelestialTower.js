import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CelestialTower.css";

import celestialTowerLeft from "../../images/celestialTower.png";
import celestialTowerRight from "../../images/celestialTowerRight.png";

import { setLocation } from "../../actions/locationActions";
import { saveUser, saveLocalUser } from "../../actions/authActions";

class CelestialTower extends Component {
  state = {
    saved: false,
    location: "/HUB/CelestialTower"
  };

  componentDidMount() {
    // ------ Location Redirect and Save ------ Required for every use.
    const { user } = this.props.auth;
    console.log(user);
    if (!this.props.auth.isAuthenticated || !user) {
      this.props.history.push("/");
    }
    // if (user.character.location !== this.state.location) {
    //   this.props.history.push(user.character.location);
    // }
  }

  redirectLocation = location => {
    const { user } = this.props.auth;
    console.log(`Sending ${user.name} to ${location}.`);
    if (location !== "/HUB/CelestialTower/Combat") {
      setLocation(user, location);
    }
    saveLocalUser(user);
    saveUser(user);
    this.props.history.push(location);
  };

  render() {
    return (
      <div id="celestialTower">
        <div id="leftImage">
          <img alt="right tower" id="towerLeft" src={celestialTowerLeft} />
        </div>
        <div id="mainTowerDiv">
          <h2>The Celestial Tower</h2>
          <hr />
          <i>
            "The Celestial Tower is ancient... Older than the civilizations that
            now roam these realms. I once scaled the tower myself, as many of my
            kin did. Foolish we were to believe that we were the ones chosen by
            the Celestials themselves... To be the first to reach the peak and
            recieve an audience from Zekrah himself.... Now I am too frail for
            such wild dreams. For those that desire to chase those dreams, be
            warned, there is more to it that meets the eye...""
          </i>
          <h5>Archmage Holland </h5>
          <i>School of Magik and History</i>
          <br />
          <br />
          <hr />
          <div id="towerElements">
            <div id="towerStatsDiv">
              <div>Tower Leaderboard</div>
              <div>Your Tower Stats and Rank</div>
            </div>
            <div id="towerButtonsDiv">
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
                onClick={() =>
                  this.redirectLocation("/HUB/CelestialTower/Combat")
                }
              >
                Enter The Tower
              </button>
            </div>
          </div>
          <div>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              onClick={() => this.redirectLocation("/HUB")}
            >
              Back To HUB
            </button>
          </div>
        </div>
        <div id="rightImage">
          <img alt="left tower" id="towerRight" src={celestialTowerRight} />
        </div>
      </div>
    );
  }
}

CelestialTower.propTypes = {
  auth: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
  saveLocalUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    saveUser,
    saveLocalUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CelestialTower));
