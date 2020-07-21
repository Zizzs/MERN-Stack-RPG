import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./../Combat.css";

// Import Calculate Initial Abilities function
import calculateAbilityPosition from "../CombatFunctions/CalculateAbilityPosition";

class CombatCelestialTower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUpdated: false,
      position: this.props.controllerState.position,
      combatAbilities: this.props.controllerState.combatAbilities,
      chainerAbilities: this.props.controllerState.chainerAbilities,
      finisherAbility: this.props.controllerState.finisherAbility,
      repositionAbilities: this.props.controllerState.repositionAbilities,
      genericAbility: this.props.controllerState.genericAbility,
      enemy: this.props.controllerState.enemy,
      abilities: this.props.controllerState.initialAbilities,
      imageLeft: this.props.controllerState.imageLeft,
      imageRight: this.props.controllerState.imageRight,
      monsterImage: this.props.controllerState.monsterImage,
    };
  }

  componentDidUpdate = () => {
    // ---------------Ability Position Control--------------------------
    // We will read the player's position, and if it has updated. We then recalculate the player's ability positions based off their clicked position.
    for (let i = 1; i <= 6; i++) {
      this.setStateAbilityPositions(i, false);
    }
    //----------------------------------------------
  };

  // Ability Position Control for componentDidUpdate
  setStateAbilityPositions = (position, hasUpdated) => {
    if (
      this.state.position === position &&
      this.state.hasUpdated === hasUpdated
    ) {
      // Calculate Ability Position will need to take in the combat prefs opposed to combat abilities and reposition abilities.
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.chainerAbilities,
        this.state.finisherAbility,
        this.state.repositionAbilities,
        this.state.genericAbility
      );

      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions,
      });
    }
  };

  redirectLocation = (location) => {
    const { user } = this.props.auth;
    console.log(`Sending ${user.name} to ${location}.`);
    this.props.history.push(location);
  };

  clickedAbility = (clickedNumber) => {
    let ability = this.state.abilities[
      Object.keys(this.state.abilities)[clickedNumber - 1]
    ];

    if (
      this.state.position - 1 === clickedNumber &&
      ability.position.repositionDirection === "Forward"
    ) {
      this.setState({ position: clickedNumber, hasUpdated: false });
    }
    if (
      this.state.position + 1 === clickedNumber &&
      ability.position.repositionDirection === "Backward"
    ) {
      this.setState({ position: clickedNumber, hasUpdated: false });
    }
    if (ability.position.repositionDirection === "Any") {
      this.setState({ position: clickedNumber, hasUpdated: false });
    }

    console.log(`Clicked Ability Number ${clickedNumber}`);
    console.log(ability);
    console.log(this.state);
  };

  render() {
    return (
      <div id="combat">
        <div id="leftImage">
          <img alt="left combat" id="combatLeft" src={this.state.imageLeft} />
        </div>
        <div id="mainCombatDiv">
          <div id="combatWrapper">
            <img id="combatImage" alt="monster" src={this.state.monsterImage} />
            <div id="combatInteractibles">
              <div id="buttonsLeft">
                <button>Text</button>
                <button>Text</button>
                <button>Text</button>
              </div>
              <div id="abilityPanel">
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(1)}
                >
                  {this.state.abilities.one.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(2)}
                >
                  {this.state.abilities.two.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(3)}
                >
                  {this.state.abilities.three.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(4)}
                >
                  {this.state.abilities.four.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(5)}
                >
                  {this.state.abilities.five.info.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(6)}
                >
                  {this.state.abilities.six.info.name}
                </div>
              </div>
              <div id="buttonsRight">
                <button>Text</button>
                <button>Text</button>
                <button>Text</button>
              </div>
            </div>
          </div>
          <button
            style={{
              width: "250px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            to="/HUB"
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={(e) => {
              e.preventDefault();
              this.redirectLocation(this.props.auth.user.character.location);
            }}
          >
            Flee
          </button>
          <button
            style={{
              width: "250px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            to="/HUB"
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={(e) => {
              e.preventDefault();
              this.props.winCombat();
            }}
          >
            Win
          </button>
        </div>
        <div id="rightImage">
          <img
            alt="right combat"
            id="combatRight"
            src={this.state.imageRight}
          />
        </div>
      </div>
    );
  }
}

CombatCelestialTower.propTypes = {
  auth: PropTypes.object.isRequired,
  calculateAbilityPosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { calculateAbilityPosition })(
  withRouter(CombatCelestialTower)
);
