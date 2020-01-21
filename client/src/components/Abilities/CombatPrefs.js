import React, { Component } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import {
  getAllAbilities,
  filterAbilities,
  saveWeapon
} from "../../actions/abilitiesActions";
import "./CombatPrefs.css";

class CombatPrefs extends Component {
  state = {
    abilities: {},
    hasUpdatedAbilities: false,
    weapons: {
      weaponOne: "",
      weaponTwo: ""
    },
    shownWeapon: "",
    shownAbilities: [],
    weaponOne: false,
    weaponTwo: false,
    combatPrefs: {},
    combatPrefsUpdated: false
  };

  componentDidUpdate = () => {
    let { user } = this.props.auth;
    if (this.checkObj(user.character)) {
      if (this.state.hasUpdatedAbilities === false) {
        getAllAbilities().then(abilities => {
          this.setState({ abilities: abilities, hasUpdatedAbilities: true });
        });
      }
      if (this.props.needUpdate === true) {
        this.setState({ combatPrefsUpdated: false });
      }
      if (this.state.combatPrefsUpdated === false) {
        this.setState({
          combatPrefs: user.character.combatPrefs,
          combatPrefsUpdated: true
        });
      }
      let weaponOneLength = Object.keys(user.character.equipment.weaponOne)
        .length;

      let weaponTwoLength = 0;
      if (this.checkObj(user.character.equipment.weaponTwo)) {
        weaponTwoLength = Object.keys(user.character.equipment.weaponTwo)
          .length;
      }

      if (weaponOneLength !== 0 && this.state.weapons.weaponOne === "") {
        this.setState({
          weapons: {
            weaponOne: user.character.equipment.weaponOne.type
          },
          shownWeapon: user.character.equipment.weaponOne.type,
          weaponOne: true,
          weaponTwo: false
        });

        if (
          user.character.combatPrefs.weaponOne.weaponType !==
          user.character.equipment.weaponOne.type
        ) {
          saveWeapon(
            user.character.equipment.weaponOne.type,
            "Weapon One",
            user
          );
        }
      }

      if (weaponTwoLength !== 0 && this.state.weapons.weaponTwo === "") {
        this.setState({
          weapons: {
            weaponTwo: user.character.equipment.weaponTwo.type
          }
        });
        if (
          user.character.combatPrefs.weaponTwo.weaponType !==
          user.character.equipment.weaponTwo.type
        ) {
          saveWeapon(
            user.character.equipment.weaponTwo.type,
            "Weapon Two",
            user
          );
        }
      }

      saveLocalUser(user);
      //console.log(this.state, user);
    }
  };

  reloadPage = e => {
    e.preventDefault();
    this.forceUpdate();
  };

  focusButton = index => {
    let buttonList = this.getButtonElements();
    for (let button of buttonList) {
      button.className = "weaponButtonText";
    }

    if (!buttonList[index].className.includes("focusdButton")) {
      buttonList[index].className = "focusedButton";
    }
  };

  showDaggers = () => {
    let daggerAbilities = [];
    let { user } = this.props.auth;
    daggerAbilities = filterAbilities(
      user.character.unlockedAbilities,
      this.state.abilities,
      "Dagger",
      "Any"
    );
    this.setState({
      shownAbilities: daggerAbilities
    });
    //console.log(this.state.shownAbilities);
    this.focusButton(0);
  };

  showUtility = () => {
    let utilityAbilities = [];
    let { user } = this.props.auth;
    utilityAbilities = filterAbilities(
      user.character.unlockedAbilities,
      this.state.abilities,
      "Utility",
      "Any"
    );
    //console.log(utilityAbilities);
    this.setState({
      shownAbilities: utilityAbilities
    });
    this.focusButton(5);
  };

  toggleShownWeapon = e => {
    e.preventDefault();
    let { user } = this.props.auth;
    let weaponTwoLength = Object.keys(user.character.equipment.weaponTwo)
      .length;
    if (weaponTwoLength > 0) {
      if (this.state.shownWeapon === this.state.weapons.weaponOne) {
        this.setState({
          shownWeapon: this.state.weapons.weaponTwo,
          weaponOne: false,
          weaponTwo: true
        });
      }

      if (this.state.shownWeapon === this.state.weapons.weaponTwo) {
        this.setState({
          shownWeapon: this.state.weapons.weaponOne,
          weaponOne: true,
          weaponTwo: false
        });
      }
    }
  };

  getButtonElements = () => {
    let daggersButton = document.getElementById("daggersButton");
    let bowsButton = document.getElementById("bowsButton");
    let stavesButton = document.getElementById("stavesButton");
    let wandsButton = document.getElementById("wandsButton");
    let swordsButton = document.getElementById("swordsButton");
    let utilityButton = document.getElementById("utilityButton");
    let buttonList = [
      daggersButton,
      bowsButton,
      stavesButton,
      wandsButton,
      swordsButton,
      utilityButton
    ];
    return buttonList;
  };

  showSkills = (e, skill) => {
    e.preventDefault();
    //console.log(skill);
    let { user } = this.props.auth;
    let abilityList = [];

    if (
      skill !== "Reposition Forward" &&
      skill !== "Reposition Backward" &&
      skill !== "Heal" &&
      skill !== "Generic"
    ) {
      abilityList = filterAbilities(
        user.character.unlockedAbilities,
        this.state.abilities,
        this.state.shownWeapon,
        skill
      );
    } else {
      abilityList = filterAbilities(
        user.character.unlockedAbilities,
        this.state.abilities,
        "Utility",
        skill
      );
    }

    this.props.togglePopupPanel(
      skill,
      abilityList,
      this.state.weaponOne,
      this.state.weaponTwo
    );
  };

  checkObj = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
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

    const showAbilities = this.state.shownAbilities.map(ability => (
      <div key={ability.info.id}>
        {ability.info.name} | {ability.info.type} | P
        {ability.position.minPosition}-P{ability.position.maxPosition}
      </div>
    ));
    let combatPrefs = this.state.combatPrefs;

    return (
      <Draggable>
        <div id="combatPrefs" className={visibility}>
          <div id="combatPrefsHeader">
            <p>Combat Preferences</p>
            <hr />
          </div>
          <div id="combatPrefsContent">
            <div>
              <p>Chosen Weapon: {this.state.shownWeapon}</p>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Position 1")}
              >
                Position 1
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.position.one).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.position.one.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.position.one).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.position.one.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Position 2")}
              >
                Position 2
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.position.two).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.position.two.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.position.two).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.position.two.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Position 3")}
              >
                Position 3
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.position.three).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.position.three.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.position.three).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.position.three.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Position 4")}
              >
                Position 4
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.position.four).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.position.four.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.position.four).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.position.four.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Position 5")}
              >
                Position 5
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.position.five).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.position.five.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.position.five).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.position.five.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Position 6")}
              >
                Position 6
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.position.six).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.position.six.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.position.six).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.position.six.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Chainer Forward")}
              >
                Chainer Forward
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.chainers.forward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.chainers.forward.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.chainers.forward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.chainers.forward.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Chainer Backward")}
              >
                Chainer Backward
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.chainers.backward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponOne.chainers.backward.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.chainers.backward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.weaponTwo.chainers.backward.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Finisher")}
              >
                Finisher
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.weaponOne.finisher).length > 0 && (
                    <span> | {combatPrefs.weaponOne.finisher.info.name}</span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.weaponTwo.finisher).length > 0 && (
                    <span> | {combatPrefs.weaponTwo.finisher.info.name}</span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Reposition Forward")}
              >
                Reposition Forward
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.utility.reposition.forward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.utility.reposition.forward.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.utility.reposition.forward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.utility.reposition.forward.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Reposition Backward")}
              >
                Reposition Backward
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.utility.reposition.backward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.utility.reposition.backward.info.name}
                    </span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.utility.reposition.backward).length >
                    0 && (
                    <span>
                      {" "}
                      | {combatPrefs.utility.reposition.backward.info.name}
                    </span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Heal")}
              >
                Heal
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.utility.heal).length > 0 && (
                    <span> | {combatPrefs.utility.heal.info.name}</span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.utility.heal).length > 0 && (
                    <span> | {combatPrefs.utility.heal.info.name}</span>
                  )}
              </div>
              <div
                className="specificSkillDiv"
                onClick={e => this.showSkills(e, "Generic")}
              >
                Generic
                {this.state.weaponOne &&
                  Object.keys(combatPrefs.utility.generic).length > 0 && (
                    <span> | {combatPrefs.utility.generic.info.name}</span>
                  )}
                {this.state.weaponTwo &&
                  Object.keys(combatPrefs.utility.generic).length > 0 && (
                    <span> | {combatPrefs.utility.generic.info.name}</span>
                  )}
              </div>
            </div>
            <div>
              {this.state.shownAbilities.length > 0 && (
                <div>{showAbilities}</div>
              )}
            </div>
            <div>
              <p
                id="daggersButton"
                className="weaponButtonText"
                onClick={this.showDaggers}
              >
                DAGGERS
              </p>
              <p id="bowsButton" className="weaponButtonText">
                BOWS
              </p>
              <p id="stavesButton" className="weaponButtonText">
                STAVES
              </p>
              <p id="wandsButton" className="weaponButtonText">
                WANDS
              </p>
              <p id="swordsButton" className="weaponButtonText">
                SWORDS
              </p>
              <p
                id="utilityButton"
                className="weaponButtonText"
                onClick={this.showUtility}
              >
                UTLITY
              </p>
            </div>
          </div>
          <div>
            <button onClick={this.props.togglePanel}>Close</button>
            <button onClick={e => this.toggleShownWeapon(e)}>
              Toggle Weapon
            </button>
            <button onClick={e => this.reloadPage(e)}>Refresh Page</button>
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
    saveWeapon: user => {
      dispatch(saveWeapon(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CombatPrefs));
