import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CharacterPanel from "../character/CharacterPanel";
import ChatPanel from "../chat/ChatPanel";
import { setLocation } from "../../actions/locationActions";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    isCharacterPanelOpen: false,
    isChatPanelOpen: false,
    isCharacterInCombat: false,
    updatedStats: false,
    healthPercent: 100,
    manaPercent: 100,
    energyPercent: 100,
    health: 25,
    maxHealth: 25,
    mana: 25,
    maxMana: 25,
    energy: 50,
    maxEnergy: 50,
    boundFragments: 0,
    unboundFragments: 0
  };

  updateLocation = location => {
    const { user } = this.props.auth;
    setLocation(user, location);
    this.props.history.push(location);
  };

  toggleCharacterPanel = () => {
    if (this.state.isCharacterPanelOpen) {
      this.setState({ isCharacterPanelOpen: false });
    } else {
      this.setState({ isCharacterPanelOpen: true });
    }
  };

  toggleChatPanel = () => {
    if (this.state.isChatPanelOpen) {
      this.setState({ isChatPanelOpen: false });
    } else {
      this.setState({ isChatPanelOpen: true });
    }
  };

  checkObj = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  render() {
    const { user } = this.props.auth;
    let healthPercent;
    let manaPercent;
    let energyPercent;
    if (this.checkObj(user)) {
      if (
        this.state.health !== user.character.health ||
        this.state.maxHealth !== user.character.maxHealth ||
        this.state.mana !== user.character.mana ||
        this.state.maxMana !== user.character.maxMana ||
        this.state.energy !== user.character.currentEnergy ||
        this.state.maxEnergy !== user.character.maxEnergy ||
        this.state.boundFragments !== user.character.boundFragments ||
        this.state.unboundFragments !== user.character.boundFragments
      ) {
        this.setState({ updatedStats: false });
      }
    }
    if (this.checkObj(user) && this.state.updatedStats === false) {
      healthPercent = (user.character.health / user.character.maxHealth) * 100;
      manaPercent = (user.character.mana / user.character.maxMana) * 100;
      energyPercent =
        (user.character.currentEnergy / user.character.maxEnergy) * 100;
      this.setState({
        health: user.character.health,
        maxHealth: user.character.maxHealth,
        mana: user.character.mana,
        maxMana: user.character.maxMana,
        energy: user.character.currentEnergy,
        maxEnergy: user.character.maxEnergy,
        healthPercent: healthPercent,
        manaPercent: manaPercent,
        energyPercent: energyPercent,
        updatedStats: true
      });
    }

    if (this.checkObj(user)) {
      return (
        <div>
          <div className="navbar-fixed">
            <nav className="z-depth-0">
              <div id="navbarDiv" className="nav-wrapper">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginLeft: "1.5rem"
                  }}
                  onClick={this.toggleCharacterPanel}
                  className="btn btn-small waves-effect hoverable #1a237e indigo darken-4"
                >
                  Character
                </button>
                <p
                  to="/HUB"
                  id="voidHeader"
                  className="col s5 brand-logo center"
                >
                  <i className="material-icons" id="chevLeft">
                    chevron_left
                  </i>
                  VOID
                  <i className="material-icons" id="chevRight">
                    chevron_right
                  </i>
                </p>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    float: "right",
                    marginRight: "1.5rem",
                    marginTop: "15px"
                  }}
                  onClick={this.toggleChatPanel}
                  className="btn btn-small waves-effect hoverable #1a237e indigo darken-4"
                >
                  Chat
                </button>
              </div>
            </nav>
          </div>
          <CharacterPanel panelOpen={this.state.isCharacterPanelOpen} />
          <ChatPanel panelOpen={this.state.isChatPanelOpen} />
          <div id="navbarCharacterStatsWrapper">
            <div id="navbarCharacterStats">
              <div>Stats Left</div>
              <div id="characterBarsDiv">
                <div id="healthBar">
                  <div id="healthBarOutline">
                    <div
                      style={{
                        backgroundColor: "#8B0000",
                        height: "100%",
                        width: `${this.state.healthPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="healthBarText">
                    {this.state.health}/{this.state.maxHealth}
                  </div>
                </div>
                <div id="manaBar">
                  <div id="manaBarOutline">
                    <div
                      style={{
                        backgroundColor: "blue",
                        height: "100%",
                        width: `${this.state.manaPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="manaBarText">
                    {this.state.mana}/{this.state.maxMana}
                  </div>
                </div>
                <div id="energyBar">
                  <div id="energyBarOutline">
                    <div
                      style={{
                        backgroundColor: "teal",
                        height: "100%",
                        width: `${this.state.energyPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="energyBarText">
                    {this.state.energy}/{this.state.maxEnergy}
                  </div>
                </div>
              </div>
              <div>
                <p>Unbound Fragments: {user.character.unboundFragments}</p>
                <p>Bound Fragments: {user.character.boundFragments}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="navbar-fixed">
            <nav className="z-depth-0">
              <div id="navbarDiv" className="nav-wrapper">
                <Link
                  to="/HUB"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="col s5 brand-logo center white-text"
                >
                  <i className="material-icons" id="chevLeft">
                    chevron_left
                  </i>
                  VOID
                  <i className="material-icons" id="chevRight">
                    chevron_right
                  </i>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      );
    }
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Navbar));
