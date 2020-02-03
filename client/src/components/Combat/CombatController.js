import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import Combat Components
import Combat from "./CombatComponents/Combat";

// Import Combat Types
import { CELESTIAL_TOWER } from "./CombatFunctions/CombatTypes";

// Import Calculate Initial Abilities function
import calculateAbilityPosition from "./CombatFunctions/CalculateAbilityPosition";

// Import Calculate Combat Images function
import calculateCombatImages from "./CombatFunctions/CalculateCombatImages";

// Import Calculate Combat Enemies function
import calculateCombatEnemies from "./CombatFunctions/CalculateCombatEnemies";

// Temp Abilities Import, Will be removed once I implement user abilities.
import { abilities } from "./CombatFunctions/AbilitiesTemp";

// Temp Monster Import, Will be removed once I implement user abilities.
import { enemies } from "./CombatFunctions/MonstersTemp";

class CombatController extends Component {
  // Get Player's Location
  // Set Initial state for combat, importing the user's preferred starting position and abilities(Will be default for now)
  // Retrieve Monster Data for that location(Create an api post to retrieve monster data from another file)
  // Set Monster Data to State
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    // Calculate Initial Abilities
    let initialAbilities = calculateAbilityPosition(
      2,
      abilities.damageAbilities,
      abilities.repositionAbilities
    );
    let images = calculateCombatImages(user.character.location);
    let monster = calculateCombatEnemies(user.character.location);
    //Position, Combat Abilities and Reposition Abilities will be pulled in from combat prefs. These will be within user.character.combatPrefs.
    this.state = {
      completedCombat: false,
      hasWon: false,
      position: 2,
      combatAbilities: abilities.damageAbilities,
      repositionAbilities: abilities.repositionAbilities,
      enemy: enemies.skeleton,
      playerLocation: user.character.location,
      initialAbilities: initialAbilities,
      imageLeft: images.left,
      imageRight: images.right,
      monsterImage: monster.image
    };
  }

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  componentDidUpdate = () => {
    const { user } = this.props.auth;
    // If statement at the top to catch completed combats. If the enemy has been killed, the combat component will perform a function callback to set the this.state.hasWon variable to true. If they lost, this.state.hasWon will be false. Regardless if they have won or not, completedCombat will be true, and will redirect the user back to the location they were previously at.
    if (this.state.completedCombat) {
      if (this.state.hasWon) {
        console.log("User Has Won!");
        //If user has won, distribute the loot here.
      } else {
        console.log("User Has Lost!");
      }
      this.props.history.push(user.character.location);
    }
  };

  // Callback function for the current combat component to pass the boolean back to combat controller.
  winCombat = () => {
    this.setState({ completedCombat: true, hasWon: true });
  };

  render() {
    // Switch/Case to choose which return combat component to use
    // Pass the full CombatController state to the combat component to use as props.
    // Render Combat Component
    if (this.state.hasWon === true) {
      alert("You have won the combat");
    }
    switch (this.state.playerLocation) {
      case CELESTIAL_TOWER:
        return (
          <Combat winCombat={this.winCombat} controllerState={this.state} />
        );
      default:
        return (
          <div>
            <p>You are in the wrong place!</p>
            <p>Click the button below to return to your current zone.</p>
          </div>
        );
    }
  }
}

CombatController.propTypes = {
  auth: PropTypes.object.isRequired,
  calculateAbilityPosition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { calculateAbilityPosition })(
  CombatController
);
