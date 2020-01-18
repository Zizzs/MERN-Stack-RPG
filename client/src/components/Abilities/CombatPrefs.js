import React, { Component } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser, saveLocalUser } from "../../actions/authActions";
import {
  getAllAbilities,
  filterAbilities
} from "../../actions/abilitiesActions";
import "./CombatPrefs.css";

class CombatPrefs extends Component {
  state = {
    abilities: {},
    hasUpdatedAbilities: false,
    shownAbilities: []
  };

  componentDidUpdate = () => {
    if (this.state.hasUpdatedAbilities === false) {
      getAllAbilities().then(abilities => {
        this.setState({ abilities: abilities, hasUpdatedAbilities: true });
      });
    }
    console.log(this.state.abilities);
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
      "Dagger"
    );
    //console.log(daggerAbilities);
    this.setState({
      shownAbilities: daggerAbilities
    });
    console.log(this.state.shownAbilities);
    this.focusButton(0);
  };

  showUtility = () => {
    let utilityAbilities = [];
    let { user } = this.props.auth;
    utilityAbilities = filterAbilities(
      user.character.unlockedAbilities,
      this.state.abilities,
      "Utility"
    );
    //console.log(utilityAbilities);
    this.setState({
      shownAbilities: utilityAbilities
    });
    this.focusButton(5);
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

  render() {
    //let { user } = this.props.auth;
    let { panelOpen } = this.props;
    let visibility = "hide";
    if (panelOpen) {
      visibility = "show";
    } else {
      visibility = "hide";
    }

    const showAbilities = this.state.shownAbilities.map(ability => (
      <div key={ability.info.id}>{ability.info.name}</div>
    ));

    return (
      <Draggable>
        <div id="combatPrefs" className={visibility}>
          <div id="combatPrefsHeader">
            <p>Combat Preferences</p>
            <hr />
          </div>
          <div id="combatPrefsContent">
            <div>Positions 1-6, chainers, finishers, repositions, etc</div>
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CombatPrefs));
