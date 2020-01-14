import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import "./AbilityPanel.css";

import { getAllAbilities } from "../../actions/abilitiesActions";

class AbilityPanel extends Component {
  state = {
    hasUpdatedAbilities: false,
    showDaggers: false,
    showUtility: false,
    currentWeaponAbilities: {},
    abilities: {}
  };

  componentDidUpdate = () => {
    if (this.state.hasUpdatedAbilities === false) {
      getAllAbilities().then(abilities => {
        this.setState({ abilities: abilities, hasUpdatedAbilities: true });
      });
    }
  };

  showDaggers = () => {
    let daggerAbilities = this.state.abilities.dagger;
    console.log(daggerAbilities);
    this.setState({
      currentWeaponAbilities: daggerAbilities,
      showUtility: false
    });
  };

  showUtility = () => {
    let utilityAbilities = this.state.abilities.utility;
    console.log(utilityAbilities);
    this.setState({
      currentWeaponAbilities: utilityAbilities,
      showUtility: true
    });
  };

  render() {
    const { user } = this.props.auth;
    let { panelOpen } = this.props;
    let visibility = "hide";
    if (panelOpen) {
      visibility = "show";
    } else {
      visibility = "hide";
    }

    let abilities = this.state.abilities;
    let currentAbilities = this.state.currentWeaponAbilities;
    console.log(this.state);

    //----------------------If Utility is being shown-------------------------
    if (
      Object.keys(abilities).length > 0 &&
      Object.keys(currentAbilities).length > 0 &&
      this.state.showUtility === true
    ) {
      return (
        <Draggable>
          <div id="abilityPanel" className={visibility}>
            <div id="abilities">
              <div id="abilityButtons">
                <div onClick={this.showDaggers} className="weaponButton">
                  <p className="weaponButtonText">DAGGERS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">BOWS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">STAVES</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">WANDS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">SWORDS</p>
                </div>
                <div onClick={this.showUtility} className="weaponButton">
                  <p className="weaponButtonText">UTLITY</p>
                </div>
              </div>
              <div id="abilities_utility">
                <div id="abilities_utility_reposition">
                  <div className="abilityPanel">
                    <p>Reposition</p>
                  </div>
                  <div
                    style={{ marginLeft: "5%", width: "95%" }}
                    className="abilityPanel"
                  >
                    <p>Forward</p>
                  </div>
                  {Object.keys(
                    this.state.currentWeaponAbilities.reposition.forward
                  ).map(ability => {
                    return (
                      <div
                        style={{ marginLeft: "10%", width: "90%" }}
                        className="abilityPanel"
                        key={
                          this.state.currentWeaponAbilities.reposition.forward[
                            ability
                          ].info.id
                        }
                      >
                        <p>
                          {
                            this.state.currentWeaponAbilities.reposition
                              .forward[ability].info.name
                          }
                        </p>
                      </div>
                    );
                  })}
                  <div
                    style={{ marginLeft: "5%", width: "95%" }}
                    className="abilityPanel"
                  >
                    <p>Backward</p>
                  </div>
                  {Object.keys(
                    this.state.currentWeaponAbilities.reposition.backward
                  ).map(ability => {
                    return (
                      <div
                        style={{ marginLeft: "10%", width: "90%" }}
                        className="abilityPanel"
                        key={
                          this.state.currentWeaponAbilities.reposition.backward[
                            ability
                          ].info.id
                        }
                      >
                        <p>
                          {
                            this.state.currentWeaponAbilities.reposition
                              .backward[ability].info.name
                          }
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div id="abilities_utility_heal">
                  <div className="abilityPanel">
                    <p>Healing</p>
                  </div>
                  {Object.keys(this.state.currentWeaponAbilities.heal).map(
                    ability => {
                      return (
                        <div
                          style={{ marginLeft: "10%", width: "90%" }}
                          className="abilityPanel"
                          key={
                            this.state.currentWeaponAbilities.heal[ability].info
                              .id
                          }
                        >
                          <p>
                            {
                              this.state.currentWeaponAbilities.heal[ability]
                                .info.name
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                <div id="abilities_utility_generic">
                  <div className="abilityPanel">
                    <p>Generic</p>
                  </div>
                  {Object.keys(this.state.currentWeaponAbilities.generic).map(
                    ability => {
                      return (
                        <div
                          style={{ marginLeft: "10%", width: "90%" }}
                          className="abilityPanel"
                          key={
                            this.state.currentWeaponAbilities.generic[ability]
                              .info.id
                          }
                        >
                          <p>
                            {
                              this.state.currentWeaponAbilities.generic[ability]
                                .info.name
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                <div id="abilities_utility_magic">
                  <div className="abilityPanel">
                    <p>Magic</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={this.props.togglePanel}
              className="closePanelButton"
            >
              X
            </button>
          </div>
        </Draggable>
      );
    }

    // ---------------If Weapon Abilities are being shown------------------
    if (
      Object.keys(abilities).length > 0 &&
      Object.keys(currentAbilities).length > 0
    ) {
      return (
        <Draggable>
          <div id="abilityPanel" className={visibility}>
            <div id="abilities">
              <div id="abilityButtons">
                <div onClick={this.showDaggers} className="weaponButton">
                  <p className="weaponButtonText">DAGGERS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">BOWS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">STAVES</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">WANDS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">SWORDS</p>
                </div>
                <div onClick={this.showUtility} className="weaponButton">
                  <p className="weaponButtonText">UTLITY</p>
                </div>
              </div>
              <div id="abilities_weapon">
                <div id="abilities_weapon_basic">
                  <div className="abilityPanel">
                    <p>Basic</p>
                  </div>
                  {Object.keys(this.state.currentWeaponAbilities.basic).map(
                    ability => {
                      return (
                        <div
                          style={{ marginLeft: "5%", width: "95%" }}
                          className="abilityPanel"
                          key={
                            this.state.currentWeaponAbilities.basic[ability]
                              .info.id
                          }
                        >
                          <p>
                            {
                              this.state.currentWeaponAbilities.basic[ability]
                                .info.name
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                <div id="abilities_daggers_chainer">
                  <div className="abilityPanel">
                    <p>Chainer</p>
                  </div>
                  {Object.keys(this.state.currentWeaponAbilities.chainer).map(
                    ability => {
                      return (
                        <div
                          style={{ marginLeft: "5%", width: "95%" }}
                          className="abilityPanel"
                          key={
                            this.state.currentWeaponAbilities.chainer[ability]
                              .info.id
                          }
                        >
                          <p>
                            {
                              this.state.currentWeaponAbilities.chainer[ability]
                                .info.name
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                <div id="abilities_daggers_finisher">
                  <div className="abilityPanel">
                    <p>Finisher</p>
                  </div>
                  {Object.keys(this.state.currentWeaponAbilities.finisher).map(
                    ability => {
                      return (
                        <div
                          style={{ marginLeft: "5%", width: "95%" }}
                          className="abilityPanel"
                          key={
                            this.state.currentWeaponAbilities.finisher[ability]
                              .info.id
                          }
                        >
                          <p>
                            {
                              this.state.currentWeaponAbilities.finisher[
                                ability
                              ].info.name
                            }
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={this.props.togglePanel}
              className="closePanelButton"
            >
              X
            </button>
          </div>
        </Draggable>
      );
    }

    // --------------If no skills are being shown---------------------
    if (
      Object.keys(abilities).length > 0 &&
      Object.keys(currentAbilities).length === 0
    ) {
      return (
        <Draggable>
          <div id="abilityPanel" className={visibility}>
            <div id="abilities">
              <div id="abilityButtons">
                <div onClick={this.showDaggers} className="weaponButton">
                  <p className="weaponButtonText">DAGGERS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">BOWS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">STAVES</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">WANDS</p>
                </div>
                <div className="weaponButton">
                  <p className="weaponButtonText">SWORDS</p>
                </div>
                <div onClick={this.showUtility} className="weaponButton">
                  <p className="weaponButtonText">UTLITY</p>
                </div>
              </div>
              <div id="abilities_weapon">
                <p>Choose a Weapon to preview abilities...</p>
              </div>
            </div>

            <button
              onClick={this.props.togglePanel}
              className="closePanelButton"
            >
              X
            </button>
          </div>
        </Draggable>
      );
    }
    // -----------------If Abilities are being Loaded---------------------
    if (Object.keys(this.state.abilities).length === 0) {
      return (
        <Draggable>
          <div id="abilityPanel" className={visibility}>
            <div>
              <p>Loading Abilities...</p>
            </div>
            <button
              onClick={this.props.togglePanel}
              className="closePanelButton"
            >
              X
            </button>
          </div>
        </Draggable>
      );
    }
  }
}

AbilityPanel.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AbilityPanel);

// //console.log(this.state.abilities[weapon]);
// Object.keys(this.state.abilities[weapon]).map(type => {
//   //console.log(this.state.abilities[weapon][type]);
//   Object.keys(this.state.abilities[weapon][type]).map(ability => {
//     //console.log(this.state.abilities[weapon][type][ability]);
//     let tempAbility = this.state.abilities[weapon][type][ability];
//     console.log(tempAbility);
//     return <div>{tempAbility.info.name}</div>;
//   });
// });
