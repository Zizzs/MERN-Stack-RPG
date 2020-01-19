import React, { Component } from "react";
import Draggable from "react-draggable";
import { unlockAbility } from "../../actions/abilitiesActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import "./SingleAbility.css";

class SingleAbility extends Component {
  componentDidUpdate = () => {
    console.log(this.props);
  };

  learnAbility = (e, ability) => {
    e.preventDefault();
    let { user } = this.props.auth;
    unlockAbility(user, ability);
    saveLocalUser(user);
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

    if (Object.keys(this.props.ability).length > 0) {
      return (
        <Draggable>
          <div id="singleAbility" className={visibility}>
            <div>
              <div id="nameAndCostDiv">
                <p>{this.props.ability.cost.experience} XP</p>
                <p id="abilityName">{this.props.ability.info.name}</p>
                <p>
                  {this.props.ability.cost.health} H |{" "}
                  {this.props.ability.cost.mana} M |{" "}
                  {this.props.ability.cost.energy} E
                </p>
              </div>
              <p id="abilityDescription">
                {this.props.ability.info.description}
              </p>
              <hr />
              <p className="descriptionHeader">Damage</p>
              <div id="damageDiv">
                Min: {this.props.ability.damage.damageMin} | Max:{" "}
                {this.props.ability.damage.damageMax} | Attack Count:{" "}
                {this.props.ability.damage.attackCount}
              </div>
              <hr />
              <p className="descriptionHeader">Position</p>
              <div id="positionDiv">
                Min: {this.props.ability.position.minPosition} | Max:{" "}
                {this.props.ability.position.maxPosition} | Reposition:{" "}
                {this.props.ability.position.doesReposition.toString()}
              </div>
              <hr />
              <p className="descriptionHeader">Healing</p>
              <div id="abilityHealingDiv">
                <div>
                  <p>Health</p>
                  <p>
                    Min: {this.props.ability.heal.healthHealAmountMin} | Max:{" "}
                    {this.props.ability.heal.healthHealAmountMax}
                  </p>
                </div>
                <div>
                  <p>Mana</p>
                  <p>
                    Min: {this.props.ability.heal.manaHealAmountMin} | Max:{" "}
                    {this.props.ability.heal.manaHealAmountMax}
                  </p>
                </div>
                <div>
                  <p>Energy</p>
                  <p>
                    Min: {this.props.ability.heal.energyHealAmountMin} | Max:{" "}
                    {this.props.ability.heal.energyHealAmountMax}
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div id="abilityButtons">
              {!user.character.unlockedAbilities.includes(
                this.props.ability.info.id
              ) && (
                <button onClick={e => this.learnAbility(e, this.props.ability)}>
                  Learn
                </button>
              )}

              <button onClick={this.props.togglePanel}>Close</button>
            </div>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable>
          <div id="singleAbility" className={visibility}>
            <button onClick={this.props.togglePanel}>Close</button>
          </div>
        </Draggable>
      );
    }
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleAbility));
