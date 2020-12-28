import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import { saveUser, saveLocalUser } from "../../actions/authActions";

// Import Combat Actions
import { damageUser } from "../../actions/combatActions";

// Import Combat Components
import Combat from "./CombatComponents/Combat";

// Import Calculate Initial Abilities function
import calculateAbilityPosition from "./CombatFunctions/CalculateAbilityPosition";

// Import Calculate Combat Images function
import calculateCombatImages from "./CombatFunctions/CalculateCombatImages";

// Import Calculate Combat Enemies function
import calculateCombatEnemies from "./CombatFunctions/CalculateCombatEnemies";

class CombatController extends Component {
  // Get Player's Location
  // Set Initial state for combat, importing the user's preferred starting position and abilities
  // Retrieve Monster Data for that location
  // Set Monster Data to State
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    // Calculate Initial Abilities
    if (this.checkObj(user.character)) {
      let initialAbilities = calculateAbilityPosition(
        user.character.combatPrefs.preferredPosition,
        0,
        user.character.combatPrefs.weaponOne.position,
        user.character.combatPrefs.weaponOne.chainers,
        user.character.combatPrefs.weaponOne.finisher,
        user.character.combatPrefs.utility.reposition,
        user.character.combatPrefs.utility.generic
      );
      let images = calculateCombatImages(user.character.location);
      
      let initiateMonsterHealthPercent = 100;

      // Starting Positions
      // [10] - Position 1
      // [9] - Position 2
      // [8] - Position 3
      // [7] - Position 4
      // [6] - Position 5
      // [5] - Position 6
      //
      // Empty Space will be 0, User will be 1, Enemy will be 2;
      let positionIndex = 9;
      let relativePositions = [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0];
      
      // Sets the user's initial relativePosition according to their preferredPosition
      for(let i = 1; i <= 6; i++){
        if(i === user.character.combatPrefs.preferredPosition){
          relativePositions[positionIndex] = 1;
        }
        positionIndex -= 1;
      }


      //Position, Combat Abilities and Reposition Abilities will be pulled in from combat prefs. These will be within user.character.combatPrefs.
      this.state = {
        validCombat: true,
        completedCombat: false,
        hasWon: 0,
        hasUpdated: false,
        userHasChained: 0,
        currentWeapon: user.character.equipment.weaponOne,
        relativePosition: relativePositions,
        position: user.character.combatPrefs.preferredPosition,
        combatAbilities: user.character.combatPrefs.weaponOne.position,
        chainerAbilities: user.character.combatPrefs.weaponOne.chainers,
        finisherAbility: user.character.combatPrefs.weaponOne.finisher,
        repositionAbilities: user.character.combatPrefs.utility.reposition,
        genericAbility: user.character.combatPrefs.utility.generic,
        enemy: {},
        playerLocation: user.character.location,
        abilities: initialAbilities,
        imageLeft: images.left,
        imageRight: images.right,
        weaponOne: user.character.equipment.weaponOne,
        weaponTwo: user.character.equipment.weaponTwo,
        monsterHealthPercent: initiateMonsterHealthPercent,
        monsterMaxHealth: 100,
      };
    } else {
      this.state = {
        validCombat: false,
      };
    }

    console.log(this.state);
  }

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    console.log("Combat Controller Mounted");

    let abilityPackage = {
      hasUpdated: false,
      newAbilityPositions: {},
      setState: false,
    };

    const { user } = this.props.auth;
    console.log(user.character.location, this.props.zoneData, this.props.regionData);
    let monster = calculateCombatEnemies(user.character.location, this.props.zoneData, this.props.regionData);

    for (let i = 1; i <= 6; i++) {
      abilityPackage = this.setStateAbilityPositions(i, false, 0, false, true, true);
      if(abilityPackage.setState){
        this.setState({hasUpdated: abilityPackage.hasUpdated, abilities: abilityPackage.newAbilityPositions, enemy: monster, monsterMaxHealth: monster.health})
      }
    }

  };

  componentDidUpdate = () => {
    const { user } = this.props.auth;
    // If statement at the top to catch completed combats. If the enemy has been killed, the combat component will perform a function callback to set the this.state.hasWon variable to 1. If they lost, this.state.hasWon will be 2. Regardless if they have won or not, completedCombat will be true, and will redirect the user back to the location they were previously at.
    if (this.state.completedCombat) {
      if (this.state.hasWon === 1) {
        console.log("User Has Won!");
        //If user has won, distribute the loot here.
        saveLocalUser(user);
        saveUser(user);
      } else {
        console.log("User Has Lost!");
      }
      this.props.updateWrapperAction("Combat Finished");
      this.props.endCombat();
    }
    console.log(this.state);
  };

  // Function where turn damage will be calculated and applied. Takes in the ability used, and the weapon used by the player. Initial damage will be calculated by taking the player's weapon's damage, and multiplying it by the skill's multiplier. This will give the damage for one hit. This number will then be multiplied by the attack count.
  // This will also eventually log the combat data in a combat log.
  calculateTurn = (abilityUsed, weaponUsed, clickedAbilityPackage) => {
    const { user } = this.props.auth;

    // clickedAbilityPackage = {
    //   position: clickedNumber,
    //   userHasChained: 0,
    //   hasUpdated: false,
    // };

    // -------------------Player Damage-------------------------

    // Clone Enemy to be modified later.
    let currentEnemy = cloneDeep(this.state.enemy);

    // Initialization of total Player Damage.
    let totalPlayerDamage = 0;

    // Calculate Single Hit Damage from Weapon and Ability Multiplier
    let playerDamage = weaponUsed.damage * abilityUsed.damage.damageMulti;


    // Loop through total amount of attacks for the ability.
    for(let i = 0; i < abilityUsed.damage.attackCount; i++){
      console.log(`You hit the ${this.state.enemy.name} for ${playerDamage}`);
      totalPlayerDamage += playerDamage;
    }

    console.log(`You did ${totalPlayerDamage} damage!`);

    // Subtract damage from current enemy's health.
    currentEnemy.health -= totalPlayerDamage;

    // Calculate the monster's percent of max health
    let currentMonsterHealthPercent = currentEnemy.health / this.state.monsterMaxHealth * 100;

    // ---------------------Enemy Damage-------------------------------------

    let enemyDamage = 0;
    let modifiedPosition = clickedAbilityPackage.position;

    let relativePlayerPosition = 0;
    let relativeEnemyPosition = 0;

    for(let i = 0; i <= this.state.relativePosition.length; i++){
      if(this.state.relativePosition[i] === 1){
        relativePlayerPosition = i;
      }

      if(this.state.relativePosition[i] === 2){
        relativeEnemyPosition = i;
      }
    }

    let differenceInRelativePlayerPosition = this.state.position - clickedAbilityPackage.position;
    let newRelativePlayerPosition = relativePlayerPosition + differenceInRelativePlayerPosition;

    // If the enemy's health is at zero, you win.

    // For Melee:
    // If the current state's position (Ex: 3) is greater than the enemy's preferred position (Ex: Skeleton's 2), the Skeleton will move forward (Decreasing position of the player by its movement property). The enemy can only attack while moving if it has the attackAndMove property set to true.

    let newRelativeEnemyPosition = 0;

    if(currentEnemy.health > 0){
      if(clickedAbilityPackage.position > currentEnemy.prefPosition && currentEnemy.rangeOrMelee === "Melee") {
        modifiedPosition = clickedAbilityPackage.position - currentEnemy.movement;
        newRelativeEnemyPosition = relativeEnemyPosition - currentEnemy.movement;
        if(currentEnemy.attackAndMove){
          enemyDamage = Math.round(Math.random() * (currentEnemy.attackMax - currentEnemy.attackMin) + currentEnemy.attackMin);
        }
      } else if(clickedAbilityPackage.position < currentEnemy.prefPosition && currentEnemy.rangeOrMelee === "Ranged") {
        modifiedPosition = clickedAbilityPackage.position + currentEnemy.movement;
        newRelativeEnemyPosition = relativeEnemyPosition + currentEnemy.movement;
        if(currentEnemy.attackAndMove){
          enemyDamage = Math.round(Math.random() * (currentEnemy.attackMax - currentEnemy.attackMin) + currentEnemy.attackMin);
        }
      } else {
        // Randomize the min/max attack values for the enemy.
        newRelativeEnemyPosition = relativeEnemyPosition;
        enemyDamage = Math.round(Math.random() * (currentEnemy.attackMax - currentEnemy.attackMin) + currentEnemy.attackMin);
      }
      

    } else {
        this.winCombat();
    }
    
      let relativePositions = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      relativePositions[newRelativePlayerPosition] = 1;
      relativePositions[newRelativeEnemyPosition] = 2;

      let abilityPackage = {
        hasUpdated: false,
        newAbilityPositions: {},
        setState: false,
      };


      //------------------------------------
      // These bools only get changed when the user is near the back wall (relative positions 0 and 1). They will remove the ability to use backwards repositions.
      // This is done to create a boundary that the player is in during combat, so that they are unable to backwards reposition indefinitely.
      let allowBackwardsReposition = true;
      let allowBackwardsFeint = true;
      if(newRelativePlayerPosition === 0){
        allowBackwardsReposition = false;
      }

      if(newRelativePlayerPosition <= 1){
        allowBackwardsFeint = false;
      }
      //-----------------------------------
      
      // Contains the abilities that will be updated, based on the user's new position, if the state has been updated yet(false), if they've chained, if the position has been modified(A bool to force an update), if the relativePosition is allowing a backwards reposition, or a backwards feint(bools); 
      abilityPackage = this.setStateAbilityPositions(modifiedPosition, false, clickedAbilityPackage.userHasChained, true, allowBackwardsReposition, allowBackwardsFeint);
      
      damageUser(user, enemyDamage);
      this.props.updateWrapperAction(`Combat:E-${currentEnemy.name}:PD-${totalPlayerDamage}:ED-${enemyDamage}`);

      if(user.character.health === 0){
        this.loseCombat();
      }

      this.setState({enemy: currentEnemy, monsterHealthPercent: currentMonsterHealthPercent, position: modifiedPosition, hasUpdated: true, abilities: abilityPackage.newAbilityPositions, relativePosition: relativePositions});    
    }
  

  // Ability Position Control for componentDidUpdate
  setStateAbilityPositions = (position, hasUpdated, hasChained, positionModified, canRepositionBackwards, allowBackwardsFeint) => {
    let abilityPackage = {};
    let chained = hasChained;

    if (
      (this.state.position === position &&
      this.state.hasUpdated === hasUpdated) || positionModified
    ) {
      // Calculate Ability Position will need to take in the combat prefs opposed to combat abilities and reposition abilities.
      
      let newAbilityPositions = calculateAbilityPosition(
        position,
        chained,
        this.state.combatAbilities,
        this.state.chainerAbilities,
        this.state.finisherAbility,
        this.state.repositionAbilities,
        this.state.genericAbility
      );

      // -----------------------------------------------
      // These next two checks are to limit the abilities shown when the user is close to the left wall (Relative Positions 0, 1, and 2. These will modify the ability positions four, five, and six by settings the given abilities to blank abilities).
      // canRepositionBackwards only applies to the backwards reposition ability that moves the user back one space and is only removed at relativePosition 0.
      // allowBackwardsFeint applies when the user is within 2 tiles of the relative position 0 and removes the ability to use backwards feints.
      if(canRepositionBackwards === false){
        Object.keys(newAbilityPositions).forEach((key) => {
          if(newAbilityPositions[key].position.repositionDirection === "Backward"){
            newAbilityPositions[key] = { info: { name: "" }, position: { repositionDirection: "None" }};
          }
        });
      }

      if(allowBackwardsFeint === false){
        Object.keys(newAbilityPositions).forEach((key) => {
          if((key === "four" || key === "five" || key === "six") && newAbilityPositions[key].info.name === "Feint"){
            newAbilityPositions[key] = { info: { name: "" }, position: { repositionDirection: "None" }};
          }
        });
      }
      //------------------------------------------------

      abilityPackage.hasUpdated = true;
      abilityPackage.newAbilityPositions = newAbilityPositions;
      abilityPackage.setState = true;
      
    }

    return abilityPackage;
  };

  clickedAbility = (clickedNumber) => {
    let ability = this.state.abilities[
      Object.keys(this.state.abilities)[clickedNumber - 1]
    ];

    console.log(ability);

    let clickedAbilityPackage = {
      position: 0,
      userHasChained: 0,
      hasUpdated: false,
    };

    //If the ability does not reposition
    if (ability.position.doesReposition === false) {
      if (ability.info.type === "Basic") {
        clickedAbilityPackage = {
          position: clickedNumber,
          userHasChained: 1,
          hasUpdated: false,
        };
      } else if (ability.info.type === "Finisher") {
        clickedAbilityPackage = {
          position: clickedNumber,
          userHasChained: 0,
          hasUpdated: false,
        };
      } else {
        clickedAbilityPackage = {
          position: clickedNumber,
          userHasChained: 0,
          hasUpdated: false,
        };
      }
    }

    // If the ability does reposition
    if (ability.position.doesReposition === true) {
      if (ability.info.type === "Generic") {
        clickedAbilityPackage = {
          position: clickedNumber,
          userHasChained: 0,
          hasUpdated: false,
        };
      }

      if (ability.position.repositionDirection === "Forward") {
        if (ability.info.type === "Chainer") {
          clickedAbilityPackage = {
            position: clickedNumber,
            userHasChained: 2,
            hasUpdated: false,
          };
        } else {
          clickedAbilityPackage = {
            position: clickedNumber,
            userHasChained: 0,
            hasUpdated: false,
          };
        }
      }

      if (ability.position.repositionDirection === "Backward") {
        if (ability.info.type === "Chainer") {
          clickedAbilityPackage = {
            position: clickedNumber,
            userHasChained: 2,
            hasUpdated: false,
          };
        } else {
          clickedAbilityPackage = {
            position: clickedNumber,
            userHasChained: 0,
            hasUpdated: false,
          };
        }
      }
    }

    if(ability.info.name !== ""){
      this.calculateTurn(ability, this.state.currentWeapon, clickedAbilityPackage);
    }
   
  };

  checkObj = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };


  // Callback function for the current combat component to pass the boolean back to combat controller.
  winCombat = () => {
    this.setState({ completedCombat: true, hasWon: 1 });
  };

  loseCombat = () => {
    this.setState({ completedCombat: true, hasWon: 2 });
  };

  render() {
    // Switch/Case to choose which return combat component to use
    // Pass the full CombatController state to the combat component to use as props.
    // Render Combat Component
    if (this.state.hasWon === 1) {
      alert("You have won the combat");
    }

    if (this.state.hasWon === 2) {
      alert("You have lost the combat");
    }

    if (this.state.validCombat === true) {
      return (
        <Combat clickedAbility={this.clickedAbility} setStateAbilityPositions={this.setStateAbilityPositions} winCombat={this.winCombat} controllerState={this.state} endCombat={this.props.endCombat}/>
      );
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>
            Comabt is invalid, click below to return to your last known
            location.
          </p>
          {/* This button breaks when refreshing on combat <button onClick={this.returnToLastLocation()}>Return</button>*/}
        </div>
      );
    }
  }
}

CombatController.propTypes = {
  auth: PropTypes.object.isRequired,
  calculateAbilityPosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { calculateAbilityPosition })(
  CombatController
);
