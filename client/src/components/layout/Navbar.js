import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
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
    );
  }
}

export default Navbar;
