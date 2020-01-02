import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CharacterPanel from "../character/CharacterPanel";
import ChatPanel from "../chat/ChatPanel";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    isCharacterPanelOpen: false,
    isChatPanelOpen: false
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
      healthPercent = (user.character.health / user.character.maxHealth) * 100;
      manaPercent = (user.character.mana / user.character.maxMana) * 100;
      energyPercent =
        (user.character.currentEnergy / user.character.maxEnergy) * 100;
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
                <Link
                  to="/dashboard"
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
                        width: `${healthPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="healthBarText">
                    {user.character.health}/{user.character.maxHealth}
                  </div>
                </div>
                <div id="manaBar">
                  <div id="manaBarOutline">
                    <div
                      style={{
                        backgroundColor: "blue",
                        height: "100%",
                        width: `${manaPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="manaBarText">
                    {user.character.mana}/{user.character.maxMana}
                  </div>
                </div>
                <div id="energyBar">
                  <div id="energyBarOutline">
                    <div
                      style={{
                        backgroundColor: "teal",
                        height: "100%",
                        width: `${energyPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="energyBarText">
                    {user.character.currentEnergy}/{user.character.maxEnergy}
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
                  to="/dashboard"
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

export default connect(mapStateToProps)(Navbar);
