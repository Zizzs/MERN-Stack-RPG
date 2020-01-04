import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CelestialTower.css";
import celestialTowerLeft from "../../images/celestialTower.png";
import celestialTowerRight from "../../images/celestialTowerRight.png";
import { Link, withRouter } from "react-router-dom";

class CelestialTower extends Component {
  render() {
    const { user } = this.props.auth;

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
          <hr />
          <div id="towerElements">
            <div id="towerStatsDiv">
              <div>Tower Leaderboard</div>
              <div>Your Tower Stats and Rank</div>
            </div>
            <div id="towerButtonsDiv">
              <Link
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                to="/HUB/CelestialTower/Combat"
                className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
              >
                Enter The Tower
              </Link>
            </div>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(CelestialTower));
