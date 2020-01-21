import React, { Component } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import { saveAbilityAtPosition } from "../../actions/abilitiesActions";

import "./CombatPrefPopup.css";

class CombatPrefPopup extends Component {
  componentDidUpdate = () => {
    //console.log(this.props);
  };

  setAbility = (e, skill, ability, user) => {
    e.preventDefault();
    console.log(skill, ability);
    saveAbilityAtPosition(
      skill,
      ability,
      user,
      this.props.weaponOne,
      this.props.weaponTwo
    );
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

    const showAbilities = this.props.abilityList.map(ability => (
      <div
        onClick={e => this.setAbility(e, this.props.skill, ability, user)}
        className="combatPrefsShownAbilities"
        key={ability.info.id}
      >
        {ability.info.name} | {ability.info.type} | P
        {ability.position.minPosition}-P{ability.position.maxPosition}
      </div>
    ));

    return (
      <Draggable>
        <div id="combatPrefPopup" className={visibility}>
          <div>
            <p id="skillSelection">{this.props.skill}</p>
            <p>
              {(this.props.weaponOne && "Weapon One") ||
                (this.props.weaponTwo && "Weapon Two")}
            </p>
          </div>
          <div>{showAbilities}</div>
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
    saveAbilityAtPosition: user => {
      dispatch(saveAbilityAtPosition(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CombatPrefPopup));
