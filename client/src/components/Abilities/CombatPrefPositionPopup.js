import React, { Component } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import { savePreferredPosition } from "../../actions/abilitiesActions";

import "./CombatPrefPopup.css";

class CombatPrefPopup extends Component {
  componentDidUpdate = () => {
    //console.log(this.props);
  };

  savePrefPosition = (e, newPosition) => {
    e.preventDefault();
    let { user } = this.props.auth;
    savePreferredPosition(newPosition, user);
    this.props.togglePanel();
  };

  render() {
    let { user } = this.props.auth;
    let { panelOpen } = this.props;
    let visibility = "hide";
    if (panelOpen) {
      visibility = "show";
    } else {
      visibility = "hide";
    }

    return (
      <Draggable>
        <div id="combatPrefPopup" className={visibility}>
          <div>
            <p
              className="combatPrefsShownAbilities"
              onClick={e => this.savePrefPosition(e, 1)}
            >
              1
            </p>
            <p
              className="combatPrefsShownAbilities"
              onClick={e => this.savePrefPosition(e, 2)}
            >
              2
            </p>
            <p
              className="combatPrefsShownAbilities"
              onClick={e => this.savePrefPosition(e, 3)}
            >
              3
            </p>
            <p
              className="combatPrefsShownAbilities"
              onClick={e => this.savePrefPosition(e, 4)}
            >
              4
            </p>
            <p
              className="combatPrefsShownAbilities"
              onClick={e => this.savePrefPosition(e, 5)}
            >
              5
            </p>
            <p
              className="combatPrefsShownAbilities"
              onClick={e => this.savePrefPosition(e, 6)}
            >
              6
            </p>
          </div>
          <div>
            <button onClick={this.props.togglePanel}>Close</button>
          </div>
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    saveUser,
    saveLocalUser: user => {
      dispatch(saveLocalUser(user));
    },
    savePreferredPosition: user => {
      dispatch(savePreferredPosition(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CombatPrefPopup));
