import React, { Component } from "react";
import { Link } from "react-router-dom";
import CharacterPanel from "../character/CharacterPanel";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    isCharacterPanelOpen: false
  };

  toggleCharacterPanel = () => {
    if (this.state.isCharacterPanelOpen) {
      this.setState({ isCharacterPanelOpen: false });
    } else {
      this.setState({ isCharacterPanelOpen: true });
    }
  };

  render() {
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
            </div>
          </nav>
        </div>
        <CharacterPanel panelOpen={this.state.isCharacterPanelOpen} />
      </div>
    );
  }
}

export default Navbar;
