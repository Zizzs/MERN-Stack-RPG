import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import "./AbilityPanel.css";

import { getAllAbilities } from "../../actions/abilitiesActions";

class AbilityPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToolTipOpen: false,
      toolTipAbility: {},
      hasUpdatedAbilities: false,
      showDaggers: false,
      showUtility: false,
      currentWeaponAbilities: {},
      abilities: {},
      experience: {
        daggers: 0,
        bows: 0,
        staves: 0,
        wands: 0,
        swords: 0,
        utility: 0
      },
      hasUpdatedExperience: false
    };
  }

  componentDidUpdate = () => {
    let { user } = this.props.auth;
    if (this.state.hasUpdatedAbilities === false) {
      getAllAbilities().then(abilities => {
        this.setState({ abilities: abilities, hasUpdatedAbilities: true });
      });
    }

    if (this.checkObj(user) && this.state.hasUpdatedExperience === false) {
      this.setState({
        experience: user.character.experience,
        hasUpdatedExperience: true
      });
    }
  };

  checkObj = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
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

  focusButton = index => {
    let buttonList = this.getButtonElements();
    for (let button of buttonList) {
      button.className = "weaponButtonText";
    }

    if (!buttonList[index].className.includes("focusdButton")) {
      buttonList[index].className = "focusedButton";
    }
  };

  showDaggers = e => {
    e.preventDefault();
    let daggerAbilities = this.state.abilities.dagger;

    this.setState({
      currentWeaponAbilities: daggerAbilities,
      showUtility: false
    });
    this.focusButton(0);
  };

  toggleAbilityCollapse = (e, targetId) => {
    e.preventDefault();
    let skillDiv = document.getElementById(targetId);
    if (skillDiv.classList.contains("hide")) {
      skillDiv.classList.remove("hide");
    } else {
      skillDiv.classList.add("hide");
    }
  };

  toggleTooltip = (e, ability) => {
    e.preventDefault();
    this.props.toggleAbilityTooltipPanel(ability);
  };

  showUtility = () => {
    let utilityAbilities = this.state.abilities.utility;

    this.setState({
      currentWeaponAbilities: utilityAbilities,
      showUtility: true
    });
    this.focusButton(5);
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

    /*----------------------If Utility is being shown-------------------------*/
    if (
      Object.keys(abilities).length > 0 &&
      Object.keys(currentAbilities).length > 0 &&
      this.state.showUtility === true
    ) {
      return (
        <Draggable>
          <div id="abilitiesPanel" className={visibility}>
            <div className="abilitiesHeader">
              <p>Abilities</p>
            </div>
            <div id="abilities">
              <div id="abilityButtons">
                <p
                  id="daggersButton"
                  className="weaponButtonText"
                  onClick={this.showDaggers}
                >
                  DAGGERS | {user.character.experience.daggers}xp
                </p>
                <p id="bowsButton" className="weaponButtonText">
                  BOWS | {user.character.experience.bows}xp
                </p>
                <p id="stavesButton" className="weaponButtonText">
                  STAVES | {user.character.experience.staves}xp
                </p>
                <p id="wandsButton" className="weaponButtonText">
                  WANDS | {user.character.experience.wands}xp
                </p>
                <p id="swordsButton" className="weaponButtonText">
                  SWORDS | {user.character.experience.swords}xp
                </p>
                <p
                  id="utilityButton"
                  className="weaponButtonText"
                  onClick={this.showUtility}
                >
                  UTLITY | {user.character.experience.utility}xp
                </p>
              </div>
              <div id="abilities_utility">
                <div id="abilities_utility_reposition">
                  <div
                    className="abilityPanel"
                    onClick={e =>
                      this.toggleAbilityCollapse(e, "repositionUtilitySkills")
                    }
                  >
                    <p className="abilityType">Reposition</p>
                  </div>
                  <div id="repositionUtilitySkills">
                    <div
                      style={{ marginLeft: "5%", width: "95%" }}
                      className="abilityPanel"
                      onClick={e =>
                        this.toggleAbilityCollapse(e, "repositionForwardSkills")
                      }
                    >
                      <p>Forward</p>
                    </div>
                    <div id="repositionForwardSkills">
                      {Object.keys(
                        this.state.currentWeaponAbilities.reposition.forward
                      ).map(ability => {
                        return (
                          <div
                            style={{ marginLeft: "10%", width: "90%" }}
                            className="abilityPanel"
                            onClick={e =>
                              this.toggleTooltip(
                                e,
                                this.state.currentWeaponAbilities.reposition
                                  .forward[ability]
                              )
                            }
                            key={
                              this.state.currentWeaponAbilities.reposition
                                .forward[ability].info.id
                            }
                          >
                            <p>
                              {
                                this.state.currentWeaponAbilities.reposition
                                  .forward[ability].info.name
                              }
                              {user.character.unlockedAbilities.includes(
                                this.state.currentWeaponAbilities.reposition
                                  .forward[ability].info.id
                              ) && " // Unlocked"}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div
                      style={{ marginLeft: "5%", width: "95%" }}
                      className="abilityPanel"
                      onClick={e =>
                        this.toggleAbilityCollapse(
                          e,
                          "repositionBackwardSkills"
                        )
                      }
                    >
                      <p>Backward</p>
                    </div>
                    <div id="repositionBackwardSkills">
                      {Object.keys(
                        this.state.currentWeaponAbilities.reposition.backward
                      ).map(ability => {
                        return (
                          <div
                            style={{ marginLeft: "10%", width: "90%" }}
                            className="abilityPanel"
                            onClick={e =>
                              this.toggleTooltip(
                                e,
                                this.state.currentWeaponAbilities.reposition
                                  .backward[ability]
                              )
                            }
                            key={
                              this.state.currentWeaponAbilities.reposition
                                .backward[ability].info.id
                            }
                          >
                            <p>
                              {
                                this.state.currentWeaponAbilities.reposition
                                  .backward[ability].info.name
                              }
                              {user.character.unlockedAbilities.includes(
                                this.state.currentWeaponAbilities.reposition
                                  .backward[ability].info.id
                              ) && " // Unlocked"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div id="abilities_utility_heal">
                  <div
                    className="abilityPanel"
                    onClick={e =>
                      this.toggleAbilityCollapse(e, "healingUtilitySkills")
                    }
                  >
                    <p className="abilityType">Healing</p>
                  </div>
                  <div id="healingUtilitySkills">
                    {Object.keys(this.state.currentWeaponAbilities.heal).map(
                      ability => {
                        return (
                          <div
                            style={{ marginLeft: "10%", width: "90%" }}
                            className="abilityPanel"
                            onClick={e =>
                              this.toggleTooltip(
                                e,
                                this.state.currentWeaponAbilities.heal[ability]
                              )
                            }
                            key={
                              this.state.currentWeaponAbilities.heal[ability]
                                .info.id
                            }
                          >
                            <p>
                              {
                                this.state.currentWeaponAbilities.heal[ability]
                                  .info.name
                              }
                              {user.character.unlockedAbilities.includes(
                                this.state.currentWeaponAbilities.heal[ability]
                                  .info.id
                              ) && " // Unlocked"}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div id="abilities_utility_generic">
                  <div
                    className="abilityPanel"
                    onClick={e =>
                      this.toggleAbilityCollapse(e, "genericUtilitySkills")
                    }
                  >
                    <p className="abilityType">Generic</p>
                  </div>
                  <div id="genericUtilitySkills">
                    {Object.keys(this.state.currentWeaponAbilities.generic).map(
                      ability => {
                        return (
                          <div
                            style={{ marginLeft: "10%", width: "90%" }}
                            className="abilityPanel"
                            onClick={e =>
                              this.toggleTooltip(
                                e,
                                this.state.currentWeaponAbilities.generic[
                                  ability
                                ]
                              )
                            }
                            key={
                              this.state.currentWeaponAbilities.generic[ability]
                                .info.id
                            }
                          >
                            <p>
                              {
                                this.state.currentWeaponAbilities.generic[
                                  ability
                                ].info.name
                              }
                              {user.character.unlockedAbilities.includes(
                                this.state.currentWeaponAbilities.generic[
                                  ability
                                ].info.id
                              ) && " // Unlocked"}
                            </p>
                          </div>
                        );
                      }
                    )}
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

    /* ---------------If Weapon Abilities are being shown------------------*/
    if (
      Object.keys(abilities).length > 0 &&
      Object.keys(currentAbilities).length > 0
    ) {
      return (
        <Draggable>
          <div id="abilitiesPanel" className={visibility}>
            <div className="abilitiesHeader">
              <p>Abilities</p>
            </div>
            <div id="abilities">
              <div id="abilityButtons">
                <p
                  id="daggersButton"
                  className="weaponButtonText"
                  onClick={this.showDaggers}
                >
                  DAGGERS | {user.character.experience.daggers}xp
                </p>
                <p id="bowsButton" className="weaponButtonText">
                  BOWS | {user.character.experience.bows}xp
                </p>
                <p id="stavesButton" className="weaponButtonText">
                  STAVES | {user.character.experience.staves}xp
                </p>
                <p id="wandsButton" className="weaponButtonText">
                  WANDS | {user.character.experience.wands}xp
                </p>
                <p id="swordsButton" className="weaponButtonText">
                  SWORDS | {user.character.experience.swords}xp
                </p>
                <p
                  id="utilityButton"
                  className="weaponButtonText"
                  onClick={this.showUtility}
                >
                  UTLITY | {user.character.experience.utility}xp
                </p>
              </div>
              <div id="abilities_weapon">
                <div id="abilities_weapon_basic">
                  <div
                    className="abilityPanel"
                    onClick={e =>
                      this.toggleAbilityCollapse(e, "basicWeaponSkills")
                    }
                  >
                    <p className="abilityType">Basic</p>
                  </div>
                  <div id="basicWeaponSkills">
                    {Object.keys(this.state.currentWeaponAbilities.basic).map(
                      ability => {
                        return (
                          <div
                            style={{ marginLeft: "5%", width: "95%" }}
                            className="abilityPanel"
                            onClick={e =>
                              this.toggleTooltip(
                                e,
                                this.state.currentWeaponAbilities.basic[ability]
                              )
                            }
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
                              {user.character.unlockedAbilities.includes(
                                this.state.currentWeaponAbilities.basic[ability]
                                  .info.id
                              ) && " // Unlocked"}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div id="abilities_daggers_chainer">
                  <div
                    className="abilityPanel"
                    onClick={e =>
                      this.toggleAbilityCollapse(e, "chainerWeaponSkills")
                    }
                  >
                    <p className="abilityType">Chainer</p>
                  </div>
                  <div id="chainerWeaponSkills">
                    {Object.keys(this.state.currentWeaponAbilities.chainer).map(
                      ability => {
                        return (
                          <div
                            style={{ marginLeft: "5%", width: "95%" }}
                            className="abilityPanel"
                            onClick={e =>
                              this.toggleTooltip(
                                e,
                                this.state.currentWeaponAbilities.chainer[
                                  ability
                                ]
                              )
                            }
                            key={
                              this.state.currentWeaponAbilities.chainer[ability]
                                .info.id
                            }
                          >
                            <p>
                              {
                                this.state.currentWeaponAbilities.chainer[
                                  ability
                                ].info.name
                              }
                              {user.character.unlockedAbilities.includes(
                                this.state.currentWeaponAbilities.chainer[
                                  ability
                                ].info.id
                              ) && " // Unlocked"}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div id="abilities_daggers_finisher">
                  <div
                    className="abilityPanel"
                    onClick={e =>
                      this.toggleAbilityCollapse(e, "finisherWeaponSkills")
                    }
                  >
                    <p className="abilityType">Finisher</p>
                  </div>
                  <div id="finisherWeaponSkills">
                    {Object.keys(
                      this.state.currentWeaponAbilities.finisher
                    ).map(ability => {
                      return (
                        <div
                          style={{ marginLeft: "5%", width: "95%" }}
                          className="abilityPanel"
                          onClick={e =>
                            this.toggleTooltip(
                              e,
                              this.state.currentWeaponAbilities.finisher[
                                ability
                              ]
                            )
                          }
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
                            {user.character.unlockedAbilities.includes(
                              this.state.currentWeaponAbilities.finisher[
                                ability
                              ].info.id
                            ) && " // Unlocked"}
                          </p>
                        </div>
                      );
                    })}
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

    /* --------------If no skills are being shown---------------------*/
    if (
      Object.keys(abilities).length > 0 &&
      Object.keys(currentAbilities).length === 0
    ) {
      return (
        <Draggable>
          <div id="abilitiesPanel" className={visibility}>
            <div className="abilitiesHeader">
              <p>Abilities</p>
            </div>
            <div id="abilities">
              <div id="abilityButtons">
                <p
                  id="daggersButton"
                  className="weaponButtonText"
                  onClick={e => {
                    this.showDaggers(e);
                  }}
                >
                  DAGGERS | {user.character.experience.daggers}xp
                </p>
                <p id="bowsButton" className="weaponButtonText">
                  BOWS | {user.character.experience.bows}xp
                </p>
                <p id="stavesButton" className="weaponButtonText">
                  STAVES | {user.character.experience.staves}xp
                </p>
                <p id="wandsButton" className="weaponButtonText">
                  WANDS | {user.character.experience.wands}xp
                </p>
                <p id="swordsButton" className="weaponButtonText">
                  SWORDS | {user.character.experience.swords}xp
                </p>
                <p
                  id="utilityButton"
                  className="weaponButtonText"
                  onClick={this.showUtility}
                >
                  UTLITY | {user.character.experience.utility}xp
                </p>
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
    /* -----------------If Abilities are being Loaded---------------------*/
    if (Object.keys(this.state.abilities).length === 0) {
      return (
        <Draggable>
          <div id="abilitiesPanel" className={visibility}>
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
  auth: PropTypes.object.isRequired,
  toggleAbilityTooltipPanel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AbilityPanel);
