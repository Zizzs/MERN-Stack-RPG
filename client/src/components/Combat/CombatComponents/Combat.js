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
      repositionAbilities: this.props.controllerState.repositionAbilities,
      enemy: this.props.controllerState.enemy,
      abilities: this.props.controllerState.initialAbilities,
      imageLeft: this.props.controllerState.imageLeft,
      imageRight: this.props.controllerState.imageRight,
      monsterImage: this.props.controllerState.monsterImage
    };
  }

  componentDidUpdate = () => {
    // ---------------Ability Position Control--------------------------
    // We will read the player's position, and if it has updated. We then recalculate the player's ability positions based off their clicked position.

    if (this.state.position === 1 && this.state.hasUpdated === false) {
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.repositionAbilities
      );
      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions
      });
    }
    if (this.state.position === 2 && this.state.hasUpdated === false) {
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.repositionAbilities
      );
      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions
      });
    }

    if (this.state.position === 3 && this.state.hasUpdated === false) {
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.repositionAbilities
      );
      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions
      });
    }

    if (this.state.position === 4 && this.state.hasUpdated === false) {
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.repositionAbilities
      );
      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions
      });
    }

    if (this.state.position === 5 && this.state.hasUpdated === false) {
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.repositionAbilities
      );
      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions
      });
    }

    if (this.state.position === 6 && this.state.hasUpdated === false) {
      let newAbilityPositions = calculateAbilityPosition(
        this.state.position,
        this.state.combatAbilities,
        this.state.repositionAbilities
      );
      this.setState({
        hasUpdated: true,
        abilities: newAbilityPositions
      });
    }
    //----------------------------------------------
  };

  redirectLocation = location => {
    const { user } = this.props.auth;
    console.log(`Sending ${user.name} to ${location}.`);
    this.props.history.push(location);
  };

  clickedAbility = clickedNumber => {
    let ability = this.state.abilities[
      Object.keys(this.state.abilities)[clickedNumber - 1]
    ];
    if (
      this.state.position - 1 === clickedNumber &&
      ability.direction === "forward"
    ) {
      this.setState({ position: clickedNumber, hasUpdated: false });
    }
    if (
      this.state.position + 1 === clickedNumber &&
      ability.direction === "backwards"
    ) {
      this.setState({ position: clickedNumber, hasUpdated: false });
    }
  };

  render() {
    // ---------Position Bar Control----------------
    // Changes the class of the divs based on the position of the character, setting the background color of the div to white to indicate the current position of the player from the monster.
    let positionOne = "notInPosition";
    let positionTwo = "notInPosition";
    let positionThree = "notInPosition";
    let positionFour = "notInPosition";
    let positionFive = "notInPosition";
    let positionSix = "notInPosition";

    if (this.state.position === 1) {
      positionOne = "inPosition";
    } else {
      positionOne = "notInPosition";
    }

    if (this.state.position === 2) {
      positionTwo = "inPosition";
    } else {
      positionTwo = "notInPosition";
    }

    if (this.state.position === 3) {
      positionThree = "inPosition";
    } else {
      positionThree = "notInPosition";
    }

    if (this.state.position === 4) {
      positionFour = "inPosition";
    } else {
      positionFour = "notInPosition";
    }

    if (this.state.position === 5) {
      positionFive = "inPosition";
    } else {
      positionFive = "notInPosition";
    }

    if (this.state.position === 6) {
      positionSix = "inPosition";
    } else {
      positionSix = "notInPosition";
    }
    // ------------------------------------
    return (
      <div id="combat">
        <div id="leftImage">
          <img alt="left combat" id="combatLeft" src={this.state.imageLeft} />
        </div>
        <div id="mainCombatDiv">
          <div id="playerPosition">
            <div id="positionOne" className={positionOne}></div>
            <div id="positionTwo" className={positionTwo}></div>
            <div id="positionThree" className={positionThree}></div>
            <div id="positionFour" className={positionFour}></div>
            <div id="positionFive" className={positionFive}></div>
            <div id="positionSix" className={positionSix}></div>
          </div>
          <div id="combatWrapper">
            <img id="combatImage" alt="monster" src={this.state.monsterImage} />
            <div id="combatInteractibles">
              <div id="buttonsLeft">
                <button>Text</button>
                <button>Text</button>
                <button>Text</button>
              </div>
              <div id="abilitiesPanel">
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(1)}
                >
                  {this.state.abilities.one.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(2)}
                >
                  {this.state.abilities.two.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(3)}
                >
                  {this.state.abilities.three.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(4)}
                >
                  {this.state.abilities.four.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(5)}
                >
                  {this.state.abilities.five.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(6)}
                >
                  {this.state.abilities.six.name}
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
              marginTop: "1rem"
            }}
            to="/HUB"
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={e => {
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
              marginTop: "1rem"
            }}
            to="/HUB"
            className="btn btn-large waves-effect hoverable #1a237e indigo darken-4"
            onClick={e => {
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
  calculateAbilityPosition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { calculateAbilityPosition })(
  withRouter(CombatCelestialTower)
);
