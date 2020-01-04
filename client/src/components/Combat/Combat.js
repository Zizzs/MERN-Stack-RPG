import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Combat.css";
import combatLeft from "../../images/combatLeft.png";
import combatRight from "../../images/combatRight.png";
import skeleton from "../../images/skeleton.png";

import { abilities } from "./AbilitiesTemp";

class Combat extends Component {
  state = {
    position: 2,
    hasUpdated: false,
    abilities: {
      positionOneAbility: { name: "" },
      positionTwoAbility: { name: "" },
      positionThreeAbility: { name: "" },
      positionFourAbility: { name: "" },
      positionFiveAbility: { name: "" },
      positionSixAbility: { name: "" }
    }
  };

  clickedAbility = clickedNumber => {
    let ability = this.state.abilities[
      Object.keys(this.state.abilities)[clickedNumber - 1]
    ];
    console.log(ability);
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
    console.log(this.state);
  };

  render() {
    const { user } = this.props.auth;
    if (this.state.position === 1 && this.state.hasUpdated === false) {
      this.setState({
        hasUpdated: true,
        abilities: {
          positionOneAbility: abilities.damageAbilities.one,
          positionTwoAbility: abilities.repositionAbilities.backwards,
          positionThreeAbility: { name: "" },
          positionFourAbility: { name: "" },
          positionFiveAbility: { name: "" },
          positionSixAbility: { name: "" }
        }
      });
    }
    if (this.state.position === 2 && this.state.hasUpdated === false) {
      this.setState({
        hasUpdated: true,
        abilities: {
          positionOneAbility: abilities.repositionAbilities.forward,
          positionTwoAbility: abilities.damageAbilities.two,
          positionThreeAbility: abilities.repositionAbilities.backwards,
          positionFourAbility: { name: "" },
          positionFiveAbility: { name: "" },
          positionSixAbility: { name: "" }
        }
      });
    }

    if (this.state.position === 3 && this.state.hasUpdated === false) {
      this.setState({
        hasUpdated: true,
        abilities: {
          positionOneAbility: { name: "" },
          positionTwoAbility: abilities.repositionAbilities.forward,
          positionThreeAbility: abilities.damageAbilities.three,
          positionFourAbility: abilities.repositionAbilities.backwards,
          positionFiveAbility: { name: "" },
          positionSixAbility: { name: "" }
        }
      });
    }

    if (this.state.position === 4 && this.state.hasUpdated === false) {
      this.setState({
        hasUpdated: true,
        abilities: {
          positionOneAbility: { name: "" },
          positionTwoAbility: { name: "" },
          positionThreeAbility: abilities.repositionAbilities.forward,
          positionFourAbility: abilities.damageAbilities.four,
          positionFiveAbility: abilities.repositionAbilities.backwards,
          positionSixAbility: { name: "" }
        }
      });
    }

    if (this.state.position === 5 && this.state.hasUpdated === false) {
      this.setState({
        hasUpdated: true,
        abilities: {
          positionOneAbility: { name: "" },
          positionTwoAbility: { name: "" },
          positionThreeAbility: { name: "" },
          positionFourAbility: abilities.repositionAbilities.forward,
          positionFiveAbility: abilities.damageAbilities.five,
          positionSixAbility: abilities.repositionAbilities.backwards
        }
      });
    }

    if (this.state.position === 6 && this.state.hasUpdated === false) {
      this.setState({
        hasUpdated: true,
        abilities: {
          positionOneAbility: { name: "" },
          positionTwoAbility: { name: "" },
          positionThreeAbility: { name: "" },
          positionFourAbility: { name: "" },
          positionFiveAbility: abilities.repositionAbilities.forward,
          positionSixAbility: abilities.damageAbilities.six
        }
      });
    }

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

    console.log(this.state);

    return (
      <div id="combat">
        <div id="leftImage">
          <img alt="left combat" id="combatLeft" src={combatLeft} />
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
            <img id="combatImage" alt="monster" src={skeleton} />
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
                  {this.state.abilities.positionOneAbility.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(2)}
                >
                  {this.state.abilities.positionTwoAbility.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(3)}
                >
                  {this.state.abilities.positionThreeAbility.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(4)}
                >
                  {this.state.abilities.positionFourAbility.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(5)}
                >
                  {this.state.abilities.positionFiveAbility.name}
                </div>
                <div
                  className="skillPanel"
                  onClick={() => this.clickedAbility(6)}
                >
                  {this.state.abilities.positionSixAbility.name}
                </div>
              </div>
              <div id="buttonsRight">
                <button>Text</button>
                <button>Text</button>
                <button>Text</button>
              </div>
            </div>
          </div>
        </div>
        <div id="rightImage">
          <img alt="right combat" id="combatRight" src={combatRight} />
        </div>
      </div>
    );
  }
}

Combat.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Combat);
