import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setLocation } from "../../actions/locationActions";
import { saveUser, saveLocalUser } from "../../actions/authActions";

import AbilityPanel from "../Abilities/AbilityPanel";
import CharacterPanel from "../character/CharacterPanel";
import ChatPanel from "../chat/ChatPanel";
import SingleAbility from "../Abilities/SingleAbility";
import CombatPrefs from "../Abilities/CombatPrefs";
import CombatPrefPopup from "../Abilities/CombatPrefPopup";
import CombatPrefPositionPopup from "../Abilities/CombatPrefPositionPopup";

import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth;
    if (this.checkObj(user.character)) {
      this.state = {
        isCharacterPanelOpen: false,
        isChatPanelOpen: false,
        isMenuPanelOpen: false,
        isAbilityPanelOpen: false,
        isAbilityTooltipPanelOpen: false,
        isCombatPrefPopupPanelOpen: false,
        isCombatPrefPositionPopupPanelOpen: false,
        isCharacterInCombat: false,
        updatedStats: false,
        health: user.character.health,
        maxHealth: user.character.maxHealth,
        mana: user.character.mana,
        maxMana: user.character.maxMana,
        energy: user.character.currentEnergy,
        maxEnergy: user.character.maxEnergy,
        healthPercent: (user.character.health / user.character.maxHealth) * 100,
        manaPercent: (user.character.mana / user.character.maxMana) * 100,
        energyPercent: user.character.energy / user.character.maxEnergy,
        boundFragments: user.character.boundFragments,
        unboundFragments: user.character.unboundFragments,
        abilityForTooltip: {},
        abilitiesForCombatPrefPopup: [],
        skillForCombatPrefPopup: "",
        newPosition: 0,
        weaponOne: false,
        weaponTwo: false,
        combatPrefsUpdated: false
      };
    } else {
      this.state = {
        isCharacterPanelOpen: false,
        isChatPanelOpen: false,
        isMenuPanelOpen: false,
        isAbilityPanelOpen: false,
        isAbilityTooltipPanelOpen: false,
        isCombatPrefPopupPanelOpen: false,
        isCombatPrefPositionPopupPanelOpen: false,
        isCombatPrefsPanelOpen: false,
        isCharacterInCombat: false,
        updatedStats: false,
        healthPercent: 100,
        manaPercent: 100,
        energyPercent: 100,
        health: 25,
        maxHealth: 25,
        mana: 25,
        maxMana: 25,
        energy: 50,
        maxEnergy: 50,
        boundFragments: 0,
        unboundFragments: 0,
        abilityForTooltip: {},
        abilitiesForCombatPrefPopup: [],
        skillForCombatPrefPopup: "",
        newPosition: 0,
        weaponOne: false,
        weaponTwo: false,
        combatPrefsUpdated: false
      };
    }
  }

  updateLocation = location => {
    const { user } = this.props.auth;
    setLocation(user, location);
    this.props.history.push(location);
  };

  toggleMenuPanel = () => {
    if (this.state.isMenuPanelOpen) {
      this.setState({ isMenuPanelOpen: false });
      document.getElementById("navOverlay").style.width = "0%";
    } else {
      this.setState({ isMenuPanelOpen: true });
      document.getElementById("navOverlay").style.width = "15%";
    }
  };

  toggleCharacterPanel = () => {
    if (this.state.isCharacterPanelOpen) {
      this.setState({ isCharacterPanelOpen: false });
    } else {
      this.setState({ isCharacterPanelOpen: true });
      document.getElementById("navOverlay").style.width = "0%";
    }
  };

  toggleAbilityPanel = () => {
    if (this.state.isAbilityPanelOpen) {
      this.setState({ isAbilityPanelOpen: false });
      const { user } = this.props.auth;
      saveUser(user);
    } else {
      this.setState({ isAbilityPanelOpen: true });
      document.getElementById("navOverlay").style.width = "0%";
    }
  };

  toggleCombatPrefsPanel = () => {
    if (this.state.isCombatPrefsPanelOpen) {
      this.setState({ isCombatPrefsPanelOpen: false });
      const { user } = this.props.auth;
      saveUser(user);
    } else {
      this.setState({ isCombatPrefsPanelOpen: true });
      document.getElementById("navOverlay").style.width = "0%";
    }
  };

  toggleAbilityTooltipPanelFromTooltip = () => {
    this.setState({
      isAbilityTooltipPanelOpen: false,
      abilityForTooltip: {}
    });
  };

  toggleCombatPrefPopupPanelFromTooltip = () => {
    this.setState({
      isCombatPrefPopupPanelOpen: false,
      abilitiesForCombatPrefPopup: [],
      combatPrefsUpdated: true
    });
    const { user } = this.props.auth;
    saveLocalUser(user);
  };

  toggleCombatPrefPopupPanel = (skill, abilityList, weaponOne, weaponTwo) => {
    this.setState({
      isCombatPrefPopupPanelOpen: true,
      abilitiesForCombatPrefPopup: abilityList,
      skillForCombatPrefPopup: skill,
      weaponOne: weaponOne,
      weaponTwo: weaponTwo,
      combatPrefsUpdated: false
    });
  };

  toggleCombatPrefPositionPopupPanel = () => {
    if (this.state.combatPrefPositionPopupPanelOpen === false) {
      this.setState({
        combatPrefPositionPopupPanelOpen: true
      });
    } else {
      this.setState({ combatPrefPositionPopupPanelOpen: false });
    }
  };

  toggleAbilityTooltipPanel = ability => {
    //console.log(ability);
    if (
      this.state.isAbilityTooltipPanelOpen &&
      ability.info.id === this.state.abilityForTooltip.info.name
    ) {
      this.setState({
        isAbilityTooltipPanelOpen: false,
        abilityForTooltip: {}
      });
    } else {
      this.setState({
        isAbilityTooltipPanelOpen: true,
        abilityForTooltip: ability
      });
    }
  };

  toggleChatPanel = () => {
    if (this.state.isChatPanelOpen) {
      this.setState({ isChatPanelOpen: false });
    } else {
      this.setState({ isChatPanelOpen: true });
      document.getElementById("navOverlay").style.width = "0%";
    }
  };

  checkObj = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  };

  render() {
    const { user } = this.props.auth;
    //console.log(user);

    if (this.checkObj(user)) {
      return (
        <div className="navbarContainer">
          <div className="topNavContainer">
            <div className="topNavCharacterButton">
              <button className="button" onClick={this.toggleMenuPanel}>
                Menu
              </button>
            </div>
            <div className="navTitle">
              <div to="/HUB" id="voidHeader">
                <i className="material-icons medium" id="chevLeft">
                  chevron_left
                </i>
                <b id="voidText">VOID</b>
                <i className="material-icons medium" id="chevRight">
                  chevron_right
                </i>
              </div>
            </div>
            <div id="navOverlay">
              <div id="navOverlay-content">
                <div>
                  <button onClick={this.toggleMenuPanel} id="navOverlay-close">
                    X
                  </button>
                </div>
                <div className="navLink" onClick={this.toggleCharacterPanel}>
                  <p>CHARACTER</p>
                </div>
                <div className="navLink">
                  <p>INVENTORY</p>
                </div>
                <div className="navLink" onClick={this.toggleCombatPrefsPanel}>
                  <p>COMBAT PREFS</p>
                </div>
                <div className="navLink" onClick={this.toggleAbilityPanel}>
                  <p>ABILITIES</p>
                </div>
                <div className="navLink" onClick={this.toggleChatPanel}>
                  <p>CHAT</p>
                </div>
              </div>
            </div>
          </div>
          <div id="navbarCharacterStatsWrapper">
            <div id="navbarCharacterStats">
              <div>Stats Left</div>
              <div id="characterBarsDiv">
                <div id="healthBar">
                  <div id="healthBarOutline">
                    <div
                      style={{
                        backgroundColor: "#8B0000",
                        height: "100%",
                        width: `${this.state.healthPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="healthBarText">
                    {this.state.health}/{this.state.maxHealth}
                  </div>
                </div>
                <div id="manaBar">
                  <div id="manaBarOutline">
                    <div
                      style={{
                        backgroundColor: "blue",
                        height: "100%",
                        width: `${this.state.manaPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="manaBarText">
                    {this.state.mana}/{this.state.maxMana}
                  </div>
                </div>
                <div id="energyBar">
                  <div id="energyBarOutline">
                    <div
                      style={{
                        backgroundColor: "teal",
                        height: "100%",
                        width: `${this.state.energyPercent}%`
                      }}
                    ></div>
                  </div>
                  <div id="energyBarText">
                    {this.state.energy}/{this.state.maxEnergy}
                  </div>
                </div>
              </div>
              <div>
                <p>Unbound Fragments: {this.state.unboundFragments}</p>
                <p>Bound Fragments: {this.state.boundFragments}</p>
              </div>
            </div>
          </div>
          <CharacterPanel
            togglePanel={this.toggleCharacterPanel}
            panelOpen={this.state.isCharacterPanelOpen}
          />
          <ChatPanel
            togglePanel={this.toggleChatPanel}
            panelOpen={this.state.isChatPanelOpen}
          />
          <SingleAbility
            ability={this.state.abilityForTooltip}
            togglePanel={this.toggleAbilityTooltipPanelFromTooltip}
            panelOpen={this.state.isAbilityTooltipPanelOpen}
          />
          <CombatPrefPopup
            abilityList={this.state.abilitiesForCombatPrefPopup}
            panelOpen={this.state.isCombatPrefPopupPanelOpen}
            togglePanel={this.toggleCombatPrefPopupPanelFromTooltip}
            skill={this.state.skillForCombatPrefPopup}
            weaponOne={this.state.weaponOne}
            weaponTwo={this.state.weaponTwo}
            needUpdate={this.state.combatPrefsUpdated}
          />
          <CombatPrefPositionPopup
            panelOpen={this.state.combatPrefPositionPopupPanelOpen}
            togglePanel={this.toggleCombatPrefPositionPopupPanel}
          />
          <AbilityPanel
            toggleAbilityTooltipPanel={this.toggleAbilityTooltipPanel}
            togglePanel={this.toggleAbilityPanel}
            panelOpen={this.state.isAbilityPanelOpen}
          />
          <CombatPrefs
            toggleCombatPrefPositionPopupPanel={
              this.toggleCombatPrefPositionPopupPanel
            }
            toggleCombatPrefsTooltipPanel={this.toggleCombatPrefsTooltipPanel}
            togglePopupPanel={this.toggleCombatPrefPopupPanel}
            togglePanel={this.toggleCombatPrefsPanel}
            panelOpen={this.state.isCombatPrefsPanelOpen}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Navbar));
